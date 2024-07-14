import { SocialLink as SocialLinkType } from '@/types';
import React from 'react';
import SocialLink from '.';

interface SocialLinkRowProps {
    links: SocialLinkType[];
}

export default function SocialLinkRow({ links }: SocialLinkRowProps) {
    return (
        <div className="flex gap-2">
            {links.map((link, i) => (
                <SocialLink key={i} link={link} />
            ))}
        </div>
    );
}
