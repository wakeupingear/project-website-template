import React from 'react';
import {
    ExternalSite,
    GroupedContributors,
    MediaEmbed,
    ProjectContributor,
    SiteConfig,
    SocialLink,
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
    [K in keyof Required<Input> &
        keyof Output]?: Required<Input>[K] extends object
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

const transform_mediaEmbed: Transform<MediaEmbed | string> = (media) => {
    if (typeof media === 'string') return media;
    if (media.type) return media;

    const url = media.url.toLowerCase();
    if (
        url.endsWith('.mp4') ||
        [
            'https://www.youtube.com/',
            'https://youtu.be/',
            'https://vimeo.com/',
        ].some((prefix) => url.startsWith(prefix))
    ) {
        media.type = 'video';
    } else if (url.endsWith('.png') || url.endsWith('.jpg')) {
        media.type = 'image';
    }

    return media;
};

export const SOCIAL_LINK_PREFIXES: Record<string, ExternalSite> = {
    'https://www.youtube.com/': 'youtube',
    'https://www.twitch.tv/': 'twitch',
    'https://twitter.com/': 'twitter',
    'https://x.com/': 'twitter',
    'https://discord.gg/': 'discord',
    'https://github.com/': 'github',
    'https://patreon.com/': 'patreon',
    'https://kickstarter.com/': 'kickstarter',
    'https://artstation.com/': 'artstation',
    'https://store.steampowered.com/app/': 'steam',
    'https://apps.apple.com/us/app/': 'apple',
    'https://tiktok.com/@': 'tiktok',
    'https://www.linkedin.com/company/': 'linkedin',
};
const transform_socialLink: Transform<SocialLink | string> = (link) => {
    if (typeof link === 'string') return link;
    if (link.site) return link;

    const prefix = Object.keys(SOCIAL_LINK_PREFIXES).find((prefix) =>
        link.href.startsWith(prefix)
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
        team: Modify<SiteConfig['team'], { contributors: GroupedContributors }>;
    }
>;

export const SITE_CONFIG_SCHEMA: Schema<SiteConfig, TransformedSiteConfig> = {
    project: {
        platforms: transform_socialLinks,
        ratings: transform_socialLinks,
        socialLinks: transform_socialLinks,
    },
    team: { contributors: transform_contributors },
    press: {},
    linkEmbeds: (original: Record<string, SocialLink>) =>
        Object.entries(original || {}).reduce((acc, [key, original]) => {
            acc[key] = transform_socialLink(original) as SocialLink;
            return acc;
        }, {} as Record<string, SocialLink>),
    mediaEmbeds: (original: Record<string, MediaEmbed>) =>
        Object.entries(original || {}).reduce((acc, [key, original]) => {
            acc[key] = transform_mediaEmbed(original) as MediaEmbed;
            return acc;
        }, {} as Record<string, MediaEmbed>),
};
