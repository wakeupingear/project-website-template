import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SITE_CONFIG from '@/config';
import '@/styles/globals.css';
import { GroupedContributors, SiteConfig } from '@/types';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { createContext, useContext, useMemo } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface Config {
    config: SiteConfig;
    groupedContributors: GroupedContributors;
}

const ConfigContext = createContext<Config>({} as Config);

export default function App({ Component, pageProps }: AppProps) {
    const configValues = useMemo<Config>(() => {
        

        const config = SITE_CONFIG;
        const groupedContributors = (
            config.contributors || []
        ).reduce<GroupedContributors>((acc, contributor) => {
            const key = contributor.department || 'Other';
            if (!acc[key]) acc[key] = [];
            acc[key].push(contributor);
            return acc;
        }, {});

        return { config, groupedContributors };
    }, []);

    return (
        <>
            <Head>
                <title>{SITE_CONFIG.gameName}</title>
            </Head>
            <ConfigContext.Provider value={configValues}>
                <div
                    className={`min-h-screen flex flex-col justify-between ${inter.className}`}
                >
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </div>
            </ConfigContext.Provider>
        </>
    );
}

export function useConfig() {
    return useContext(ConfigContext);
}
