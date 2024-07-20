import { SocialLink as SocialLinkType } from '@/src/utils/types';
import React from 'react';
import SocialLink, { SocialLinkProps } from '.';

interface SocialLinkRowProps extends Omit<SocialLinkProps, 'link'> {
    links: SocialLinkType[];
}

export default function SocialLinkRow({ links, ...rest }: SocialLinkRowProps) {
    return (
        <div className="flex gap-2">
            {links.map((link, i) => (
                <SocialLink key={i} {...rest} link={link} />
            ))}
        </div>
    );
}
