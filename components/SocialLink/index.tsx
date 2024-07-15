import { useConfig } from '@/pages/_app';
import { SocialLink as SocialLinkType, ExternalSite } from '@/types';
import React from 'react';
import { IconType } from 'react-icons';
import {
    FaArtstation,
    FaDiscord,
    FaExternalLinkAlt,
    FaGithub,
    FaKickstarter,
    FaPatreon,
    FaTwitch,
    FaTwitter,
    FaYoutube,
} from 'react-icons/fa';

const ICONS: Record<ExternalSite, IconType> = {
    artstation: FaArtstation,
    discord: FaDiscord,
    github: FaGithub,
    kickstarter: FaKickstarter,
    patreon: FaPatreon,
    twitch: FaTwitch,
    twitter: FaTwitter,
    youtube: FaYoutube,
};

const ICON_PROPS = {
    className: 'inline-block mr-1',
};

interface SocialLinkProps {
    link: SocialLinkType | string;
}

export default function SocialLink({ link: _link }: SocialLinkProps) {
    let link = _link;
    const { linkEmbeds = {} } = useConfig();
    if (typeof link === 'string') {
        if (link in linkEmbeds) link = linkEmbeds[link];
        else return null;
    }

    const { href, name, site } = link;
    const IconComponent = ICONS[site as ExternalSite];

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-link text-red"
        >
            <span className="text-nowrap inline-block">
                {IconComponent ? (
                    <IconComponent {...ICON_PROPS} size={20} />
                ) : (
                    <FaExternalLinkAlt {...ICON_PROPS} size={12} />
                )}
            </span>
            {name || site}
        </a>
    );
}
