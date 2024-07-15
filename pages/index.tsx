import Section from '@/src/components/Section';
import { useConfig } from './_app';
import Navbar from '@/src/components/Navbar';

export default function Home() {
    const {
        project: { name: gameName, logline },
        homepage: { content },
    } = useConfig();

    return (
        <>
            <Navbar />
            <main>
                <div className="bg-blue-300 h-screen w-full flex items-center justify-center flex-col gap-4">
                    <h1 className="text-6xl text-center">{gameName}</h1>
                    <p>{logline}</p>
                </div>
                <div className="flex flex-col gap-12 mt-4">
                    {Boolean(content.length) && (
                        <div className="flex flex-col gap-12">
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
