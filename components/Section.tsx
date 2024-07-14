import { SiteSection } from '@/types';
import React from 'react';
import CenterContent from './CenterContent';

interface SectionProps {
    section: SiteSection;
}

export default function Section({ section }: SectionProps) {
    const { title, content } = section;

    return (
        <CenterContent>
            <h2 className="text-3xl">{title}</h2>
            {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </CenterContent>
    );
}
