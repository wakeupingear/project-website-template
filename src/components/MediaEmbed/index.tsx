import { MediaEmbed as MediaEmbedType } from '@/src/utils/types';
import React from 'react';
import VideoEmbed from './VideoEmbed';
import ImageEmbed from './ImageEmbed';

export type MediaEmbedProps = {
    media: MediaEmbedType;
    defaultName?: string;
};

export default function MediaEmbed({ media }: MediaEmbedProps) {
    const { type, name: _name } = media;

    if (type === 'image') return <ImageEmbed media={media} />;
    if (type === 'video') return <VideoEmbed media={media} />;

    return <div>Unsupported media type</div>;
}
