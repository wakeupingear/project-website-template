import { useConfig } from '@/pages/_app';
import { SocialLink as SocialLinkType, ExternalSite } from '@/src/utils/types';
import React from 'react';
import { IconType } from 'react-icons';
import {
    FaApple,
    FaArtstation,
    FaDiscord,
    FaExternalLinkAlt,
    FaGithub,
    FaKickstarter,
    FaLinkedin,
    FaPatreon,
    FaSteam,
    FaTiktok,
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
    steam: FaSteam,
    apple: FaApple,
    linkedin: FaLinkedin,
    tiktok: FaTiktok,
};

const ICON_PROPS = {
    className: 'inline-block mr-1',
};

export interface SocialLinkProps {
    link: SocialLinkType;
    hideText?: boolean;
    haveComma?: boolean;
}

export default function SocialLink({
    link,
    hideText,
    haveComma,
}: SocialLinkProps) {
    const { href, name, site } = link;
    const IconComponent = ICONS[site as ExternalSite];

    return (
        <span className="inline-block">
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-link text-red"
            >
                <span className="text-nowrap">
                    {IconComponent ? (
                        <IconComponent {...ICON_PROPS} size={20} />
                    ) : (
                        <FaExternalLinkAlt {...ICON_PROPS} size={12} />
                    )}
                </span>
                {Boolean(!hideText || !IconComponent) && (name || site)}
            </a>
            {haveComma && (
                <span className="text-black !no-underline">,&nbsp;</span>
            )}
        </span>
    );
}
