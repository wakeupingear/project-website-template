import { MediaEmbed } from '@/src/utils/types';
import dynamic from 'next/dynamic';
import React from 'react';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoEmbedProps {
    media: MediaEmbed;
}

export default function VideoEmbed({ media }: VideoEmbedProps) {
    const { name, url } = media;

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">{name}</h3>
            <div className="child:rounded-xl child:overflow-hidden child:shadow-lg">
                <ReactPlayer url={url} controls />
            </div>
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-link"
            >
                {url.replaceAll('https://www.', '').replaceAll('https://', '')}
            </a>
        </div>
    );
}
