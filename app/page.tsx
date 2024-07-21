import Section from '@/src/components/Section';
import Navbar from '@/src/components/Navbar';
import SocialCardColumn from '@/src/components/SocialLink/SocialCardColumn';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';
import ImageEmbed from '@/src/components/MediaEmbed/ImageEmbed';
import getConfig from '@/src/lib/getConfig';

export default function Home() {
    const {
        project: { name: gameName, logline, socialLinks, logo },
        homepage: { content, links },
    } = getConfig();

    const hasMainContent = Boolean(content.length);

    return (
        <>
            <Navbar />
            <main>
                <div className="bg-blue-300 min-h-screen w-full flex items-center justify-between flex-col gap-4">
                    <div />
                    <div className="flex flex-col gap-4">
                        {logo ? (
                            <div className="relative h-96 aspect-square">
                                <ImageEmbed
                                    media={logo}
                                    defaultName={gameName}
                                    imageProps={{
                                        fill: true,
                                    }}
                                />
                            </div>
                        ) : null}
                        <p className="text-lg">{logline}</p>
                        <SocialCardColumn
                            links={links || socialLinks}
                            className="mt-8"
                        />
                    </div>
                    <div className="mb-4">
                        {hasMainContent && (
                            <Link href={`#${content[0]?.id}`}>
                                <FaCaretDown size={48} />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-12">
                    {hasMainContent && (
                        <div className="homepage-content flex flex-col gap-12 pt-12">
                            {content.map((section) => (
                                <Section
                                    section={section}
                                    key={section.id}
                                    padSides
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
