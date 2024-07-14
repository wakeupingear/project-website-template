import { SocialLink as SocialLinkType } from '@/types';
import React from 'react';

interface SocialLinkProps {
    link: SocialLinkType;
}

export default function SocialLink({ link }: SocialLinkProps) {
    return (
        <a href={link.link} target="_blank" rel="noreferrer">
            {link.name || link.site}
        </a>
    );
}
