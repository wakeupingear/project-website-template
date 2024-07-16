import { MediaEmbed } from '@/src/utils/types';
import Image from 'next/image';
import React from 'react';

interface ImageEmbedProps {
    media: MediaEmbed;
}

export default function ImageEmbed({ media }: ImageEmbedProps) {
    const { name, url } = media;

    return (
        <div className="flex items-center justify-center">
            <Image
                src={url}
                alt={name}
                title={name}
                width={800}
                height={450}
                className="rounded-xl shadow-lg overflow-hidden object-contain"
            />
        </div>
    );
}
