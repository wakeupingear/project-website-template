import Footer from '@/src/components/Footer';
import {
    applySchema,
    recursiveStringTransform,
    SITE_CONFIG_SCHEMA,
} from '@/src/utils/schemas';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { createContext, useContext, useMemo } from 'react';
import SITE_CONFIG from '@/config';
import SocialLink from '@/src/components/SocialLink';
import { TransformedSiteConfig } from '@/src/utils/types';

const inter = Inter({ subsets: ['latin'] });

const ConfigContext = createContext<TransformedSiteConfig>(
    {} as TransformedSiteConfig
);

export default function App({ Component, pageProps }: AppProps) {
    const configValues = useMemo(() => {
        let transformedData = applySchema(SITE_CONFIG_SCHEMA, SITE_CONFIG);

        if (transformedData.cache.linkEmbeds) {
            const patternsToMatch = Object.entries(
                transformedData.cache.linkEmbeds
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

    const {
        project: { name: gameName },
    } = configValues;

    return (
        <>
            <Head>
                <title>{gameName}</title>
            </Head>
            <ConfigContext.Provider value={configValues}>
                <div
                    className={`min-h-screen flex flex-col justify-between ${inter.className}`}
                >
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
