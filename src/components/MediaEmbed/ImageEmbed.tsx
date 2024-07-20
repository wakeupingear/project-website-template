import useGallery from '@/src/hooks/useGallery';
import { imageIsTransparent } from '@/src/utils';
import { MediaEmbed } from '@/src/utils/types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef } from 'react';
import { BiDownload } from 'react-icons/bi';

interface ImageEmbedProps {
    media: MediaEmbed;
}

export default function ImageEmbed({ media }: ImageEmbedProps) {
    const { name, url } = media;
    const transparent = imageIsTransparent(url);

    const imageRef = useRef<HTMLImageElement>(null);
    const { setOpen } = useGallery(url, imageRef);

    return (
        <div
            className={clsx(
                'flex items-center justify-center relative group overflow-hidden'
            )}
        >
            <Image
                src={url}
                alt={name}
                title={name}
                width={800}
                height={450}
                className={clsx(
                    'rounded-xl overflow-hidden object-contain transition-all hover:cursor-pointer hover:rounded-3xl',
                    {
                        'shadow-lg hover:shadow-xl': !transparent,
                    }
                )}
                onClick={() => setOpen(true)}
                ref={imageRef}
            />
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
