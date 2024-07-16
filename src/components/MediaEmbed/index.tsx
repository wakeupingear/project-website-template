import { useConfig } from '@/pages/_app';
import { MediaEmbed as MediaEmbedType } from '@/src/utils/types';
import React from 'react';
import VideoEmbed from './VideoEmbed';
import ImageEmbed from './ImageEmbed';

type MediaEmbedProps = {
    media: MediaEmbedType | string;
};

export default function MediaEmbed({ media: _media }: MediaEmbedProps) {
    let media = _media;
    const { mediaEmbeds = {} } = useConfig();
    if (typeof media === 'string') {
        if (media in mediaEmbeds) media = mediaEmbeds[media];
        else return null;
    }

    const { type } = media;
    if (type === 'image') return <ImageEmbed media={media} />;
    if (type === 'video') return <VideoEmbed media={media} />;

    return <div>Unsupported media type</div>;
}
