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
    socialLinks?: SocialLink[];
    department?: string;
};

export type GroupedContributors = Record<string, ProjectContributor[]>;

export type SiteConfig = {
    gameName: string;
    logline: string;
    sections: SiteSection[];
    teamName?: string;
    teamLink?: string;
    includePress?: boolean;
    socialLinks?: SocialLink[];
    contributors?: ProjectContributor[];
};
