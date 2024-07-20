import { SocialLink as SocialLinkType } from '@/src/utils/types';
import React from 'react';
import type { SocialLinkProps } from '.';
import SocialCard from './SocialCard';
import clsx from 'clsx';

interface SocialCardColumnProps extends Omit<SocialLinkProps, 'link'> {
    links: SocialLinkType[];
    className?: string;
}

export default function SocialCardColumn({
    links,
    className,
    ...rest
}: SocialCardColumnProps) {
    return (
        <div className={clsx('flex flex-col gap-4', className)}>
            {links.map((link, i) => (
                <SocialCard key={i} {...rest} link={link} />
            ))}
        </div>
    );
}
