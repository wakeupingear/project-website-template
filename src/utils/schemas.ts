import React from 'react';
import {
    _ProjectContributor,
    ExternalSite,
    GroupedContributors,
    MediaEmbed,
    ProjectContributor,
    SchemaCache,
    SchemaInput,
    SiteConfig,
    SocialLink,
    TransformedSiteConfig,
} from './types';
import { isImage, isUrl, isVideo } from './media';

type Transform<Input, Output = Input> = (
    original: Input,
    cache: SchemaCache
) => Output extends (infer U)[] ? NonNullable<U>[] : Output;

const IGNORED_STRING_TRANSFORM_KEYS = [
    'url',
    'cache',
    'name',
    'logline',
    'logo',
    'contributors',
    'link',
    'id',
    'title',
    'videos',
    'images',
    'logos',
];

export const recursiveStringTransform = (
    obj: any,
    transform: (original: string) => string | React.ReactNode
): any => {
    if (typeof obj === 'string') {
        return obj ? transform(obj) : '';
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => recursiveStringTransform(item, transform));
    }

    if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) {
        const result: { [key: string]: any } = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = !IGNORED_STRING_TRANSFORM_KEYS.some((k) =>
                    key.toLowerCase().includes(k)
                )
                    ? recursiveStringTransform(obj[key], transform)
                    : obj[key];
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

const _applySchema = <Input extends SchemaInput, Output extends object>(
    schema: Schema<Input, Output>,
    original: Input,
    cache: SchemaCache
): Output => {
    return Object.keys(original).reduce<Output>((acc, _key) => {
        const key = _key as keyof Input & keyof Output;
        const transform = schema[key];
        let val: any = original[key];
        if (transform) {
            if (typeof transform === 'function') {
                val = (transform as Transform<any, any>)(original[key], cache);
            } else {
                val = applySchema(transform as Schema<any, any>, original[key]);
            }
        }
        acc[key] = val;

        return acc;
    }, (Array.isArray(original) ? [] : {}) as Output);
};

export const applySchema = <Input extends SchemaInput, Output extends object>(
    schema: Schema<Input, Output>,
    original: Input,
    cache?: SchemaCache
): Output => {
    if (!original) {
        console.trace();
        throw new Error('No original data');
    }
    let _cache: SchemaCache;
    if (typeof cache === 'undefined') {
        _cache = _applySchema(
            (schema as any).cache,
            original.cache as unknown as Input,
            original.cache
        ) as SchemaCache;
    } else _cache = cache;

    return Object.keys(original).reduce<Output>((acc, _key) => {
        const key = _key as keyof Input & keyof Output;
        const transform = schema[key];
        let val: any = original[key];
        if (transform) {
            if (typeof transform === 'function') {
                val = (transform as Transform<any, any>)(original[key], _cache);
            } else {
                val = applySchema(
                    transform as Schema<any, any>,
                    original[key],
                    _cache
                );
            }
        }
        acc[key] = val;

        return acc;
    }, (Array.isArray(original) ? [] : {}) as Output);
};

const transform_mediaEmbed: Transform<
    MediaEmbed | string | undefined,
    MediaEmbed | undefined
> = (media, cache) => {
    if (!media) return undefined;
    if (typeof media === 'string') {
        const embed = cache.mediaEmbeds[media];
        if (embed) return embed;

        if (isUrl(media) || isImage(media)) {
            console.warn(
                `No media embed for ${media}; this leads to accessibility issues.`
            );
            media = { url: media, name: '' };
        } else throw new Error(`Unknown media embed: ${media}`);
    }
    if (media.type) return media;

    const url = media.url.toLowerCase();
    if (isVideo(url)) media.type = 'video';
    else if (isImage(url)) media.type = 'image';

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
const transform_socialLink: Transform<
    SocialLink | string | undefined,
    SocialLink | undefined
> = (link, cache) => {
    if (!link) return undefined;
    if (typeof link === 'string') {
        const site = cache.linkEmbeds[link];
        if (site) return site;

        const prefix = Object.keys(SOCIAL_LINK_PREFIXES).find((prefix) =>
            (link as string).startsWith(prefix)
        );
        if (prefix) {
            const site = SOCIAL_LINK_PREFIXES[prefix];
            return { href: link, site };
        }

        if (link.startsWith('https://' || link.startsWith('http://')))
            link = { href: link };
        else throw new Error(`Unknown link: ${link}`);
    }
    if (link.site) return link;

    const prefix = Object.keys(SOCIAL_LINK_PREFIXES).find((prefix) =>
        link.href.startsWith(prefix)
    );
    if (prefix) link.site = SOCIAL_LINK_PREFIXES[prefix];

    return link;
};
const transform_socialLinks: Transform<
    (SocialLink | string)[] | undefined,
    SocialLink[]
> = (links, cache) =>
    (links
        ?.map((link) => transform_socialLink(link, cache))
        .filter(Boolean) as SocialLink[]) || [];

const transform_contributor: Transform<
    _ProjectContributor,
    ProjectContributor
> = (contributor, cache) => ({
    ...contributor,
    socialLinks: transform_socialLinks(contributor.socialLinks, cache),
});
const transform_contributors: Transform<
    _ProjectContributor[] | undefined,
    GroupedContributors
> = (contributors, cache) =>
    (
        contributors?.map((contributor) =>
            transform_contributor(contributor, cache)
        ) || []
    ).reduce<GroupedContributors>((acc, contributor) => {
        const key = contributor.department || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(contributor);
        return acc;
    }, {});

const transform_linkEmbedMap: Transform<Record<string, SocialLink>> = (
    original,
    cache
) =>
    Object.entries(original || {}).reduce((acc, [key, original]) => {
        acc[key] = transform_socialLink(original, cache) as SocialLink;
        return acc;
    }, {} as Record<string, SocialLink>);

const transform_mediaEmbedMap: Transform<Record<string, MediaEmbed>> = (
    original,
    cache
) =>
    Object.entries(original || {}).reduce((acc, [key, original]) => {
        acc[key] = transform_mediaEmbed(original, cache) as MediaEmbed;
        return acc;
    }, {} as Record<string, MediaEmbed>);

const transform_mediaEmbeds: Transform<
    MediaEmbed[] | undefined,
    MediaEmbed[]
> = (original, cache) =>
    (original
        ?.map((embed) => transform_mediaEmbed(embed, cache))
        .filter(Boolean) as MediaEmbed[]) || [];

export const SITE_CONFIG_SCHEMA: Schema<SiteConfig, TransformedSiteConfig> = {
    project: {
        platforms: transform_socialLinks,
        ratings: transform_socialLinks,
        socialLinks: transform_socialLinks,
        logo: transform_mediaEmbed,
    },
    team: { contributors: transform_contributors, link: transform_socialLink },
    press: {
        images: transform_mediaEmbeds,
        videos: transform_mediaEmbeds,
        logos: transform_mediaEmbeds,
    },
    cache: {
        linkEmbeds: transform_linkEmbedMap as any,
        mediaEmbeds: transform_mediaEmbedMap as any,
    },
};
