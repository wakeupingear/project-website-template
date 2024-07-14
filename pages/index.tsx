import Section from '@/components/Section';
import SITE_CONFIG from '@/config';

export default function Home() {
    return (
        <main>
            <div className="bg-blue-300 h-screen w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-6xl">{SITE_CONFIG.gameName}</h1>
                <p>{SITE_CONFIG.gameName}</p>
            </div>
            <div className="flex flex-col gap-12 mt-4">
                {Boolean(SITE_CONFIG.sections.length) && (
                    <div className="flex flex-col gap-4">
                        {SITE_CONFIG.sections.map((section) => (
                            <Section section={section} key={section.id} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
