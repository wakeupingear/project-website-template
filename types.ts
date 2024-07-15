import React from 'react';

export type SocialSite =
    | 'twitter'
    | 'discord'
    | 'github'
    | 'youtube'
    | 'twitch'
    | 'artstation'
    | 'patreon'
    | 'kickstarter';
export type SocialLink = {
    link: string;
    site?: SocialSite;
    name?: string;
};
type _SocialLink = SocialLink | string;

export type SiteSection = {
    id: string;
    title: string;
    shortTitle?: string;
    content: (string | React.ReactNode)[];
    hideInNav?: boolean;
};

export type ProjectContributor = {
    name: string;
    role: string;
    socialLinks?: _SocialLink[];
    department?: string;
};
export type GroupedContributors = Record<string, ProjectContributor[]>;

export type SiteConfig = {
    linkEmbeds?: Record<string, SocialLink>;
    gameName: string;
    logline: string;
    sections: SiteSection[];
    teamName?: string;
    teamLink?: string;
    includePress?: boolean;
    socialLinks?: _SocialLink[];
    contributors?: ProjectContributor[];
};
