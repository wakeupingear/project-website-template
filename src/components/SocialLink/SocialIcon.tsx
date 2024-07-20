import { ExternalSite } from '@/src/utils/types';
import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
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

export const siteHasIcon = (site: ExternalSite | undefined) =>
    Boolean(site && site in ICONS);

interface SocialIconProps extends IconBaseProps {
    site: ExternalSite | undefined;
}

export default function SocialIcon({ site, ...props }: SocialIconProps) {
    const IconComponent = site ? ICONS[site] : null;

    return (
        <span className="text-nowrap">
            {IconComponent ? (
                <IconComponent {...ICON_PROPS} size={20} {...props} />
            ) : (
                <FaExternalLinkAlt {...ICON_PROPS} size={12} {...props} />
            )}
        </span>
    );
}
