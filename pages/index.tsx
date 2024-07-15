import Section from '@/components/Section';
import { useConfig } from './_app';

export default function Home() {
    const { sections, gameName, logline } = useConfig();

    return (
        <main>
            <div className="bg-blue-300 h-screen w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-6xl text-center">{gameName}</h1>
                <p>{logline}</p>
            </div>
            <div className="flex flex-col gap-12 mt-4">
                {Boolean(sections.length) && (
                    <div className="flex flex-col gap-12">
                        {sections.map((section) => (
                            <Section section={section} key={section.id} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
