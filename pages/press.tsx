import React from 'react';
import { useConfig } from './_app';
import Factsheet from '@/src/components/press/Factsheet';
import Section from '@/src/components/Section';
import MediaEmbed from '@/src/components/MediaEmbed';
import { GalleryWrapper } from '@/src/hooks/useGallery';

export default function Press() {
    const {
        project: { description, logo },
        press,
    } = useConfig();

    const { content, videos, images, disabled, logos: _logos } = press;
    if (disabled) return null;

    const logos = _logos ? _logos : logo ? [logo] : [];

    return (
        <main className="flex flex-col">
            <div className="bg-gray-300 w-full min-h-32"></div>
            <div className="flex flex-col p-8 gap-8">
                <div className="flex flex-col gap-8 max-width-content">
                    <div className="flex gap-8">
                        <Factsheet />
                        <div className="flex flex-col gap-4">
                            <h2>Description</h2>
                            <p>{description}</p>
                            {Boolean(content?.length) &&
                                content &&
                                content.map((section) => (
                                    <Section
                                        key={section.id}
                                        section={section}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                {videos && videos.length > 0 && (
                    <>
                        <h2 className="border-t-2 pt-8">Videos</h2>
                        <div className="gap-4">
                            {videos.map((media, i) => (
                                <MediaEmbed
                                    key={`video-${i}`}
                                    media={media}
                                    defaultName={`Video${
                                        videos.length > 1 ? ` ${i + 1}` : ''
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
                {images && images.length > 0 && (
                    <>
                        <h2 className="border-t-2 pt-8">Images</h2>
                        <div className="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid grid-cols-2 gap-4">
                            <GalleryWrapper urls={images}>
                                {images.map((media, i) => (
                                    <MediaEmbed
                                        key={`image-${i}`}
                                        media={media}
                                        defaultName={`Image ${
                                            images.length > 1 ? ` ${i + 1}` : ''
                                        }`}
                                    />
                                ))}
                            </GalleryWrapper>
                        </div>
                    </>
                )}
                {logos.length > 0 && (
                    <>
                        <h2 className="border-t-2 pt-8">
                            Logo{logos.length > 1 && 's'}
                        </h2>
                        <div className="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid grid-cols-2 gap-4">
                            <GalleryWrapper urls={logos}>
                                {logos.map((media, i) => (
                                    <MediaEmbed
                                        key={`image-${i}`}
                                        media={media}
                                        defaultName={`Logo${
                                            logos.length > 1 ? ` ${i + 1}` : ''
                                        }`}
                                    />
                                ))}
                            </GalleryWrapper>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
