import React from 'react';
import SocialIcon, { siteHasIcon } from './SocialIcon';
import { SocialLink } from '@/src/utils/types';

export interface SocialCardProps {
    link: SocialLink;
}

export default function SocialCard({ link }: SocialCardProps) {
    const { href, name, site } = link;

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-link text-red w-full min-w-[37rem] bg-black rounded-2xl h-16 flex items-center justify-between p-4 hover:scale-110 transition-transform"
        >
            <SocialIcon site={site} size={32} />
            <span className="text-lg font-semibold">{name}</span>
            <button>fsdf</button>
        </a>
    );
}
