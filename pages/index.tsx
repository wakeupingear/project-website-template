import Section from '@/src/components/Section';
import { useConfig } from './_app';
import Navbar from '@/src/components/Navbar';
import SocialCardColumn from '@/src/components/SocialLink/SocialCardColumn';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
    const {
        project: { name: gameName, logline, socialLinks },
        homepage: { content, links = [] },
    } = useConfig();

    const hasMainContent = Boolean(content.length);

    return (
        <>
            <Navbar />
            <main>
                <div className="bg-blue-300 h-screen w-full flex items-center justify-center flex-col gap-4">
                    <h1 className="text-6xl text-center">{gameName}</h1>
                    <p>{logline}</p>
                    <SocialCardColumn links={socialLinks} className="mt-8" />
                    {hasMainContent && (
                        <Link
                            className="absolute bottom-4"
                            href={`#${content[0]?.id}`}
                        >
                            <FaCaretDown size={48} />
                        </Link>
                    )}
                </div>
                <div className="flex flex-col gap-12 mt-4">
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
