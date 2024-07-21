import { SiteContent, SiteSection } from '@/src/utils/types';
import React from 'react';
import CenterContent from './CenterContent';

interface SectionProps extends SiteContent {
    section: SiteSection;
    padSides?: boolean;
    isList?: boolean;
}

export default function Section({
    section,
    padSides,
    isList: _isList,
    config,
}: SectionProps) {
    const { title, content, id } = section;

    return (
        <CenterContent id={id} padSides={padSides}>
            <h2>{title}</h2>
            {Array.isArray(content)
                ? content.map((Item, i) =>
                      typeof Item === 'function' ? (
                          <Item key={i} config={config} />
                      ) : (
                          <React.Fragment key={i}>{Item}</React.Fragment>
                      )
                  )
                : content}
        </CenterContent>
    );
}
