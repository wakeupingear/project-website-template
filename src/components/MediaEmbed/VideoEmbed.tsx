import dynamic from 'next/dynamic';
import React from 'react';
import { MediaEmbedProps } from '.';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoEmbedProps extends MediaEmbedProps {}

export default function VideoEmbed({
    media: _media,
    defaultName,
}: VideoEmbedProps) {
    const { url, type } = _media;
    const media = {
        ..._media,
        name:
            _media.name ||
            defaultName ||
            (type === 'image' ? 'Image' : type === 'video' ? 'Video' : 'Media'),
    };
    const { name } = media;
    if (type !== 'video') return null;

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
