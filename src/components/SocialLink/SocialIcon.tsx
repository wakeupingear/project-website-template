import { EXTERNAL_SITE_METADATA, ExternalSite } from '@/src/utils/types';
import React from 'react';
import { IconBaseProps } from 'react-icons';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ICON_PROPS = {
    className: 'inline-block mr-1',
};

export const siteHasIcon = (site: ExternalSite | undefined) =>
    Boolean(site && site in EXTERNAL_SITE_METADATA);

interface SocialIconProps extends IconBaseProps {
    site: ExternalSite | undefined;
}

export default function SocialIcon({ site, ...props }: SocialIconProps) {
    const IconComponent = site ? EXTERNAL_SITE_METADATA[site].icon : null;

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
