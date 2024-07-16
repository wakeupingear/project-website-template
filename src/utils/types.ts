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

export type ProjectContributor = {
    name: string;
    role: string;
    socialLinks?: _SocialLink[];
    department?: string;
};
export type GroupedContributors = Record<string, ProjectContributor[]>;

export type SiteConfig = {
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
        contributors?: ProjectContributor[];
    };
    homepage: {
        content: SiteSection[];
    };
    press?: {
        content: SiteSection[];
        videos?: _MediaEmbed[];
        images?: _MediaEmbed[];
    };
    linkEmbeds?: Record<string, SocialLink>;
    mediaEmbeds?: Record<string, MediaEmbed>;
};
