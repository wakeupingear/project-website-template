import { SiteSection } from '@/types';
import React, { Fragment } from 'react';
import CenterContent from './CenterContent';

interface SectionProps {
    section: SiteSection;
}

export default function Section({ section }: SectionProps) {
    const { title, content, id } = section;

    return (
        <CenterContent id={id}>
            <h2 className="text-3xl">{title}</h2>
            {content.map((entry, index) => (
                <Fragment key={index}>
                    {typeof entry === 'string' ? <p>{entry}</p> : entry}
                </Fragment>
            ))}
        </CenterContent>
    );
}
