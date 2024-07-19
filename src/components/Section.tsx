import { SiteSection } from '@/src/utils/types';
import React, { Fragment } from 'react';
import CenterContent from './CenterContent';

interface SectionProps {
    section: SiteSection;
    padSides?: boolean;
    isList?: boolean;
}

export default function Section({
    section,
    padSides,
    isList: _isList,
}: SectionProps) {
    const { title, content, id, bulletPoints } = section;
    const isList = bulletPoints || _isList;

    const innerContent = content.map((entry, index) => {
        const children =
            typeof entry === 'string' && !isList ? <p>{entry}</p> : entry;
        return (
            <Fragment key={index}>
                {isList ? (
                    <li className="list-disc list-inside">{children}</li>
                ) : (
                    children
                )}
            </Fragment>
        );
    });

    return (
        <CenterContent id={id} padSides={padSides}>
            <>
                <h2>{title}</h2>
                {isList ? (
                    <ul className="flex flex-col gap-2">{innerContent}</ul>
                ) : (
                    innerContent
                )}
            </>
        </CenterContent>
    );
}
