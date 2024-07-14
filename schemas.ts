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
        if (!transform) {
            acc[key] = original[key] as any;
        } else if (typeof transform === 'function') {
            (acc[key] as any) = (transform as Transform<any, any>)(
                original[key]
            );
        } else {
            acc[key] = applySchema(
                transform as Schema<any, any>,
                original[key]
            );
        }
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
const transform_socialLink: Transform<SocialLink> = (link) => {
    if (link.site) return link;

    const prefix = Object.keys(SOCIAL_LINK_PREFIXES).find((prefix) =>
        link.link.startsWith(prefix)
    );
    if (prefix) link.site = SOCIAL_LINK_PREFIXES[prefix];
    return link;
};
const transform_socialLinks: Transform<SocialLink[] | undefined> = (links) =>
    links?.map(transform_socialLink);

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
