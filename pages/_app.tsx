import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
    applySchema,
    recursiveStringTransform,
    SITE_CONFIG_SCHEMA,
    TransformedSiteConfig,
} from '@/schemas';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { createContext, useContext, useMemo } from 'react';
import SITE_CONFIG from '@/config';
import SocialLink from '@/components/SocialLink';

const inter = Inter({ subsets: ['latin'] });

const ConfigContext = createContext<TransformedSiteConfig>(
    {} as TransformedSiteConfig
);

export default function App({ Component, pageProps }: AppProps) {
    const configValues = useMemo(() => {
        let transformedData = applySchema(SITE_CONFIG_SCHEMA, SITE_CONFIG);

        if (transformedData.linkEmbeds) {
            const patternsToMatch = Object.entries(
                transformedData.linkEmbeds
            ).reduce((acc, [key, value], i) => {
                acc[key] = () => {
                    return <SocialLink link={value} key={`link-${i}`} />;
                };
                return acc;
            }, {} as Record<string, Function>);

            transformedData = recursiveStringTransform(
                transformedData,
                (str) => {
                    if (!str.includes('{{')) return str;

                    let sections: string[] = str.split(/\{\{|\}\}/);
                    let isHTML = false;
                    sections = sections.map((section) => {
                        if (section in patternsToMatch) {
                            const transformedSection =
                                patternsToMatch[section]();
                            isHTML =
                                isHTML ||
                                typeof transformedSection !== 'string';
                            return transformedSection;
                        }

                        return section;
                    });

                    if (isHTML) return <p>{sections}</p>;
                    return sections.join('');
                }
            );
        }

        return transformedData;
    }, []);

    return (
        <>
            <Head>
                <title>{configValues.gameName}</title>
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
