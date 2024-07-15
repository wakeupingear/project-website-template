import { useConfig } from '@/pages/_app';
import { SocialLink as SocialLinkType } from '@/types';
import React from 'react';

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

    return (
        <a
            href={link.link}
            target="_blank"
            rel="noreferrer"
            className="text-link"
        >
            {link.name || link.site}
        </a>
    );
}
