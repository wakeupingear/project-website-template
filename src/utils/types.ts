import React from 'react';
import { IconType } from 'react-icons';
import { BsSubstack } from 'react-icons/bs';
import {
    FaApple,
    FaArtstation,
    FaDiscord,
    FaExternalLinkAlt,
    FaGithub,
    FaItchIo,
    FaKickstarter,
    FaLinkedin,
    FaMastodon,
    FaPatreon,
    FaRegEnvelope,
    FaSpotify,
    FaSteam,
    FaTiktok,
    FaTrophy,
    FaTwitch,
    FaTwitter,
    FaWikipediaW,
    FaXbox,
    FaYoutube,
} from 'react-icons/fa';

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
    | 'linkedin'
    | 'substack'
    | 'mastodon'
    | 'speedrun'
    | 'email'
    | 'spotify'
    | 'xbox'
    | 'wikipedia'
    | 'itch';

export const EXTERNAL_SITE_METADATA: Record<
    ExternalSite,
    {
        icon: IconType;
        prefixes?: string[];
    }
> = {
    artstation: { icon: FaArtstation, prefixes: ['https://artstation.com/'] },
    discord: { icon: FaDiscord, prefixes: ['https://discord.gg/'] },
    github: { icon: FaGithub, prefixes: ['https://github.com/'] },
    kickstarter: {
        icon: FaKickstarter,
        prefixes: ['https://kickstarter.com/'],
    },
    mastodon: { icon: FaMastodon, prefixes: ['https://mastodon.social/'] },
    patreon: { icon: FaPatreon, prefixes: ['https://patreon.com/'] },
    speedrun: { icon: FaTrophy, prefixes: ['https://speedrun.com/'] },
    substack: { icon: BsSubstack, prefixes: ['https://substack.com/'] },
    twitch: { icon: FaTwitch, prefixes: ['https://twitch.tv/'] },
    twitter: {
        icon: FaTwitter,
        prefixes: ['https://twitter.com/', 'https://x.com/'],
    },
    youtube: {
        icon: FaYoutube,
        prefixes: ['https://youtube.com/', 'https://www.youtube.com/'],
    },
    steam: { icon: FaSteam, prefixes: ['https://store.steampowered.com/app/'] },
    apple: { icon: FaApple, prefixes: ['https://apps.apple.com/us/app/'] },
    linkedin: {
        icon: FaLinkedin,
        prefixes: ['https://www.linkedin.com/company/'],
    },
    tiktok: { icon: FaTiktok, prefixes: ['https://tiktok.com/@'] },
    email: { icon: FaRegEnvelope, prefixes: ['mailto:'] },
    spotify: { icon: FaSpotify, prefixes: ['https://open.spotify.com/'] },
    xbox: { icon: FaXbox, prefixes: ['https://www.xbox.com/en-us/games/'] },
    wikipedia: { icon: FaWikipediaW, prefixes: ['https://wikipedia.org/'] },
    itch: { icon: FaItchIo, prefixes: ['https://itch.io/'] },
};

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
    content: (string | React.ReactNode | React.FC<SiteContent>)[];
    hideInNav?: boolean;
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

export type SiteRouteProps = {
    params: { siteId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export interface SiteConfig extends SchemaInput {
    project: {
        name: string;
        logline: string;
        description: string;
        releaseDate?: string | number | Date;
        platforms?: _SocialLink[];
        ratings?: _SocialLink[];
        socialLinks?: _SocialLink[];
        logo?: _MediaEmbed;
    };
    team: {
        name: string;
        link?: string;
        contributors?: _ProjectContributor[];
    };
    homepage: {
        links?: _SocialLink[];
        content: SiteSection[];
    };
    press: {
        disabled?: boolean;
        content: SiteSection[];
        videos?: _MediaEmbed[];
        images?: _MediaEmbed[];
        logos?: _MediaEmbed[];
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
                logo?: MediaEmbed;
                description?: string | React.ReactNode;

                releaseDateStr?: string;
                descriptionStr?: string;
            }
        >;
        team: Modify<
            SiteConfig['team'],
            { contributors: GroupedContributors; link?: SocialLink }
        >;
        homepage: Modify<SiteConfig['homepage'], { links?: SocialLink[] }>;
        press: Modify<
            SiteConfig['press'],
            { images: MediaEmbed[]; videos: MediaEmbed[]; logos: MediaEmbed[] }
        >;
    }
>;

export const DEFUALT_SITE_CONFIG: TransformedSiteConfig = {
    project: {
        description: '',
        name: '',
        logline: '',
        platforms: [],
        ratings: [],
        socialLinks: [],
    },
    team: {
        name: '',
        contributors: {},
    },
    homepage: {
        content: [],
        links: [],
    },
    press: {
        content: [],
        videos: [],
        images: [],
        logos: [],
    },
    cache: { linkEmbeds: {}, mediaEmbeds: {} },
};

export interface SiteContent {
    config: TransformedSiteConfig;
}
