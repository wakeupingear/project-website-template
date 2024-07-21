'use client';

import useGallery from '@/src/hooks/useGallery';
import { imageIsTransparent } from '@/src/utils';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import React, { useRef } from 'react';
import { BiDownload } from 'react-icons/bi';
import { MediaEmbedProps } from '.';

interface ImageEmbedProps extends MediaEmbedProps {
    imageProps?: Partial<ImageProps>;
}

export default function ImageEmbed({
    media: _media,
    imageProps,
    defaultName,
}: ImageEmbedProps) {
    const { url, type } = _media;
    const media = {
        ..._media,
        name:
            _media.name ||
            defaultName ||
            (type === 'image' ? 'Image' : type === 'video' ? 'Video' : 'Media'),
    };
    const { name } = media;
    const transparent = imageIsTransparent(url);

    const imageRef = useRef<HTMLImageElement>(null);
    const gallery = useGallery(url, imageRef);

    if (type !== 'image') return null;

    const content = (
        <Image
            src={url}
            alt={name}
            title={name}
            width={imageProps?.fill ? undefined : 800}
            height={imageProps?.fill ? undefined : 450}
            {...imageProps}
            className={clsx(
                'rounded-xl overflow-hidden object-contain transition-all',
                {
                    'shadow-lg hover:shadow-xl': !transparent,
                    'hover:cursor-pointer hover:rounded-3xl': gallery,
                }
            )}
            onClick={gallery ? () => gallery.setOpen(true) : undefined}
            ref={imageRef}
        />
    );

    if (!gallery) return content;

    return (
        <div
            className={clsx(
                'flex items-center justify-center relative group overflow-hidden'
            )}
        >
            {content}
            <a
                className={clsx(
                    'absolute bg-white w-8 h-8 rounded-full flex items-center justify-center transition-all -top-8 right-2 group-hover:top-2 hover:invert border-2 border-black'
                )}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <BiDownload />
            </a>
        </div>
    );
}
