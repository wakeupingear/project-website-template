import clsx from 'clsx';
import React from 'react';

type CenterContentProps = {
    children: React.ReactNode;
    id: string;
    padSides?: boolean;
};

export default function SectionContent({
    children,
    id,
    padSides,
}: CenterContentProps) {
    return (
        <section
            id={id}
            className={clsx('flex flex-col gap-2', {
                'w-[min(100vw-6rem,40rem)] mx-auto': padSides,
            })}
        >
            {children}
        </section>
    );
}
