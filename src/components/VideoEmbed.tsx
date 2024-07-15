import { useConfig } from '@/pages/_app';
import { MediaEmbed } from '@/src/utils/types';
import dynamic from 'next/dynamic';
import React from 'react';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type VideoEmbedProps = {
    video: MediaEmbed | string;
};

export default function VideoEmbed({ video: _video }: VideoEmbedProps) {
    let video = _video;
    const { mediaEmbeds = {} } = useConfig();
    if (typeof video === 'string') {
        if (video in mediaEmbeds) video = mediaEmbeds[video];
        else return null;
    }

    const { name, url } = video;

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">{name}</h3>
            <ReactPlayer
                url={url}
                controls
                style={{
                    overflow: 'hidden',
                    borderRadius: '1rem',
                }}
            />
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
