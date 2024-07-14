import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SITE_CONFIG from '@/config';
import {
    applySchema,
    SITE_CONFIG_SCHEMA,
    TransformedSiteConfig,
} from '@/schemas';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { createContext, useContext, useMemo } from 'react';

const inter = Inter({ subsets: ['latin'] });

const ConfigContext = createContext<TransformedSiteConfig>(
    {} as TransformedSiteConfig
);

export default function App({ Component, pageProps }: AppProps) {
    const configValues = useMemo(() => {
        return applySchema(SITE_CONFIG_SCHEMA, SITE_CONFIG);
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
