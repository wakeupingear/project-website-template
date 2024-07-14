import React from 'react';

type SocialPreset =
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
    preset?: SocialPreset;
    name?: string;
};

export const SOCIAL_LINK_PREFIXES: Record<string, SocialPreset> = {
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
