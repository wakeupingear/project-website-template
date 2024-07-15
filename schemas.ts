import React from 'react';
import {
    GroupedContributors,
    ProjectContributor,
    SiteConfig,
    SocialLink,
    SocialSite,
} from './types';

type Transform<Input, Output = Input> = (
    original: Input
) => Output extends (infer U)[] ? NonNullable<U>[] : Output;

export const recursiveStringTransform = (
    obj: any,
    transform: (original: string) => string | React.ReactNode
): any => {
    if (typeof obj === 'string') {
        return transform(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => recursiveStringTransform(item, transform));
    }

    if (typeof obj === 'object' && obj !== null) {
        const result: { [key: string]: any } = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = recursiveStringTransform(obj[key], transform);
            }
        }
        return result;
    }

    return obj;
};

export type Schema<Input, Output> = {
    [K in keyof Input & keyof Output]?: Input[K] extends object
        ? Schema<Input[K], Output[K]>
        : Transform<Input[K], Output[K]>;
};

export function applySchema<Input extends object, Output extends object>(
    schema: Schema<Input, Output>,
    original: Input
): Output {
    return Object.keys(original).reduce<Output>((acc, _key) => {
        const key = _key as keyof Input & keyof Output;
        const transform = schema[key];
        let val: any = original[key];
        if (transform) {
            if (typeof transform === 'function') {
                val = (transform as Transform<any, any>)(original[key]);
            } else {
                val = applySchema(transform as Schema<any, any>, original[key]);
            }
        }
        acc[key] = val;

        return acc;
    }, (Array.isArray(original) ? [] : {}) as Output);
}

export const SOCIAL_LINK_PREFIXES: Record<string, SocialSite> = {
    'https://www.youtube.com/watch?': 'youtube',
    'https://www.twitch.tv/': 'twitch',
    'https://twitter.com/': 'twitter',
    'https://x.com/': 'twitter',
    'https://discord.gg/': 'discord',
    'https://github.com/': 'github',
    'https://patreon.com/': 'patreon',
    'https://kickstarter.com/': 'kickstarter',
    'https://artstation.com/': 'artstation',
};
const transform_socialLink: Transform<SocialLink | string> = (link) => {
    if (typeof link === 'string') return link;
    if (link.site) return link;

    const prefix = Object.keys(SOCIAL_LINK_PREFIXES).find((prefix) =>
        link.link.startsWith(prefix)
    );
    if (prefix) link.site = SOCIAL_LINK_PREFIXES[prefix];
    return link;
};
const transform_socialLinks: Transform<(SocialLink | string)[] | undefined> = (
    links
) => links?.map(transform_socialLink);

const transform_contributor: Transform<ProjectContributor> = (contributor) => ({
    ...contributor,
    socialLinks: transform_socialLinks(contributor.socialLinks),
});
const transform_contributors: Transform<
    ProjectContributor[] | undefined,
    GroupedContributors
> = (contributors) =>
    (
        contributors?.map(transform_contributor) || []
    ).reduce<GroupedContributors>((acc, contributor) => {
        const key = contributor.department || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(contributor);
        return acc;
    }, {});

type Modify<T, R> = Omit<T, keyof R> & R;
export type TransformedSiteConfig = Modify<
    SiteConfig,
    {
        contributors: GroupedContributors;
    }
>;

export const SITE_CONFIG_SCHEMA: Schema<SiteConfig, TransformedSiteConfig> = {
    socialLinks: transform_socialLinks,
    contributors: transform_contributors,
};
