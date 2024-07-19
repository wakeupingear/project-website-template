import React from 'react';

export type ExternalSite =
    | 'twitter'
    | 'discord'
    | 'github'
    | 'youtube'
    | 'twitch'
    | 'artstation'
    | 'patreon'
    | 'kickstarter'
    | 'steam'
    | 'apple'
    | 'tiktok'
    | 'linkedin';
export type SocialLink = {
    href: string;
    site?: ExternalSite;
    name?: string;
};
type _SocialLink = SocialLink | string;

export type MediaEmbed = {
    url: string;
    name: string;
    type?: 'video' | 'image';
};
type _MediaEmbed = MediaEmbed | string;

export type SiteSection = {
    id: string;
    title: string;
    shortTitle?: string;
    content: (string | React.ReactNode)[];
    hideInNav?: boolean;
    bulletPoints?: boolean;
};

export type _ProjectContributor = {
    name: string;
    role: string;
    socialLinks?: _SocialLink[];
    department?: string;
};
export type ProjectContributor = Modify<
    _ProjectContributor,
    { socialLinks: SocialLink[] }
>;
export type GroupedContributors = Record<string, ProjectContributor[]>;

type Modify<T, R> = Omit<T, keyof R> & R;

export type SchemaCache = {
    linkEmbeds: Record<string, SocialLink>;
    mediaEmbeds: Record<string, MediaEmbed>;
};
export interface SchemaInput {
    cache: SchemaCache;
}

export interface SiteConfig extends SchemaInput {
    project: {
        name: string;
        logline: string;
        description: string;
        releaseDate?: string | number | Date;
        platforms?: _SocialLink[];
        ratings?: _SocialLink[];
        socialLinks?: _SocialLink[];
    };
    team: {
        name: string;
        link?: string;
        contributors?: _ProjectContributor[];
    };
    homepage: {
        content: SiteSection[];
    };
    press: {
        disabled?: boolean;
        content: SiteSection[];
        videos?: _MediaEmbed[];
        images?: _MediaEmbed[];
    };
}

export type TransformedSiteConfig = Modify<
    SiteConfig,
    {
        project: Modify<
            SiteConfig['project'],
            {
                platforms: SocialLink[];
                ratings: SocialLink[];
                socialLinks: SocialLink[];
            }
        >;
        team: Modify<SiteConfig['team'], { contributors: GroupedContributors }>;
        press: Modify<
            SiteConfig['press'],
            { images: MediaEmbed[]; videos: MediaEmbed[] }
        >;
    }
>;
