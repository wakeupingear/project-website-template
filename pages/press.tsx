import React from 'react';
import { useConfig } from './_app';
import Factsheet from '@/src/components/press/Factsheet';
import Section from '@/src/components/Section';
import VideoEmbed from '@/src/components/VideoEmbed';

export default function Press() {
    const {
        project: { description },
        press,
    } = useConfig();

    if (!press) return null;
    const { content, videos } = press;

    return (
        <main className="flex flex-col">
            <div className="bg-gray-300 w-full min-h-32"></div>
            <div className="flex flex-col p-8 gap-8">
                <div className="w-full flex flex-col gap-2 items-start">
                    <button>download</button>
                </div>
                <div className="flex gap-8 pb-8 border-b-2">
                    <Factsheet />
                    <div className="flex flex-col gap-4">
                        <h2>Description</h2>
                        <p>{description}</p>
                        {Boolean(content?.length) &&
                            content &&
                            content.map((section) => (
                                <Section key={section.id} section={section} />
                            ))}
                    </div>
                </div>
                {videos && videos.length > 0 && (
                    <>
                        <h2>Videos</h2>
                        <div className="border-b-2 pb-8 gap-4">
                            {videos.map((video, i) => (
                                <VideoEmbed key={`video-${i}`} video={video} />
                            ))}
                        </div>
                    </>
                )}
                <h2>Images</h2>
                <div className="border-b-2"></div>
            </div>
        </main>
    );
}
