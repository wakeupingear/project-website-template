import { SiteSection } from '@/src/utils/types';
import React from 'react';
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
    const { title, content, id } = section;

    return (
        <CenterContent id={id} padSides={padSides}>
            <h2>{title}</h2>
            {Array.isArray(content)
                ? content.map((item, i) => (
                      <React.Fragment key={i}>{item}</React.Fragment>
                  ))
                : content}
        </CenterContent>
    );
}
