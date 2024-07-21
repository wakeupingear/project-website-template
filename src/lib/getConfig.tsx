'server-only';
import SITE_CONFIG from '@/config';
import {
    applySchema,
    recursiveStringTransform,
    SITE_CONFIG_SCHEMA,
} from '../utils/schemas';
import SocialLink from '../components/SocialLink';
import MarkdownWrapper from '../components/MarkdownWrapper';
import React, { cache } from 'react';

const getConfig = () => {
    let config = applySchema(SITE_CONFIG_SCHEMA, SITE_CONFIG);

    if (config.cache.linkEmbeds) {
        const patternsToMatch = Object.entries(config.cache.linkEmbeds).reduce(
            (acc, [key, value], i) => {
                acc[key.toLowerCase()] = () => {
                    return (
                        <SocialLink link={value} key={`link-${i}`} hideLogo />
                    );
                };
                return acc;
            },
            {
                project: () => <b key="project">{config.project.name}</b>,
                team: () => <b key="team">{config.team.name}</b>,
            } as Record<string, Function>
        );

        config = recursiveStringTransform(config, (str) => {
            if (!str.includes('{{'))
                return <MarkdownWrapper>{str}</MarkdownWrapper>;

            str = str
                .replaceAll('}} ', '}}&nbsp;')
                .replaceAll(' {{', '&nbsp;{{');
            let sections: (string | React.ReactNode)[] = str.split(/\{\{|\}\}/);
            let isHTML = false;
            sections = (sections as string[]).map((_section) => {
                const section = _section.toLowerCase();
                if (section in patternsToMatch) {
                    const transformedSection = patternsToMatch[section]();
                    isHTML = isHTML || typeof transformedSection !== 'string';
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
                                    <MarkdownWrapper key={i} removeParagraph>
                                        {s}
                                    </MarkdownWrapper>
                                );
                            return <React.Fragment key={i}>{s}</React.Fragment>;
                        })}
                    </p>
                );
            return <MarkdownWrapper>{sections.join('')}</MarkdownWrapper>;
        });
    }

    const { releaseDate } = config.project;
    if (releaseDate)
        config.project.releaseDateStr =
            typeof releaseDate === 'number'
                ? new Date(releaseDate).toLocaleDateString()
                : typeof releaseDate === 'string'
                ? releaseDate
                : releaseDate.toLocaleDateString();

    return config;
};

export default cache(getConfig);
