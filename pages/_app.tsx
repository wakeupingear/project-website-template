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
import React, { createContext, useContext, useMemo } from 'react';
import SITE_CONFIG from '@/config';
import SocialLink from '@/src/components/SocialLink';
import { TransformedSiteConfig } from '@/src/utils/types';
import MarkdownWrapper from '@/src/components/MarkdownWrapper';

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
            ).reduce(
                (acc, [key, value], i) => {
                    acc[key.toLowerCase()] = () => {
                        return (
                            <SocialLink
                                link={value}
                                key={`link-${i}`}
                                hideLogo
                            />
                        );
                    };
                    return acc;
                },
                {
                    project: () => (
                        <b key="project">{transformedData.project.name}</b>
                    ),
                    team: () => <b key="team">{transformedData.team.name}</b>,
                } as Record<string, Function>
            );

            transformedData = recursiveStringTransform(
                transformedData,
                (str) => {
                    if (!str.includes('{{'))
                        return <MarkdownWrapper>{str}</MarkdownWrapper>;

                    str = str
                        .replaceAll('}} ', '}}&nbsp;')
                        .replaceAll(' {{', '&nbsp;{{');
                    let sections: (string | React.ReactNode)[] =
                        str.split(/\{\{|\}\}/);
                    let isHTML = false;
                    sections = (sections as string[]).map((_section) => {
                        const section = _section.toLowerCase();
                        if (section in patternsToMatch) {
                            const transformedSection =
                                patternsToMatch[section]();
                            isHTML =
                                isHTML ||
                                typeof transformedSection !== 'string';
                            return transformedSection;
                        }

                        return _section;
                    });

                    if (isHTML)
                        return (
                            <p>
                                {sections.map((s, i) => {
                                    if (typeof s === 'string')
                                        return (
                                            <MarkdownWrapper
                                                key={i}
                                                removeParagraph
                                            >
                                                {s}
                                            </MarkdownWrapper>
                                        );
                                    return (
                                        <React.Fragment key={i}>
                                            {s}
                                        </React.Fragment>
                                    );
                                })}
                            </p>
                        );
                    return (
                        <MarkdownWrapper>{sections.join('')}</MarkdownWrapper>
                    );
                }
            );
        }

        const { releaseDate } = transformedData.project;
        if (releaseDate)
            transformedData.project.releaseDateStr =
                typeof releaseDate === 'number'
                    ? new Date(releaseDate).toLocaleDateString()
                    : typeof releaseDate === 'string'
                    ? releaseDate
                    : releaseDate.toLocaleDateString();

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
