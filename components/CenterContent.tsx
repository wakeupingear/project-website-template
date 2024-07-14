import React from 'react';

type CenterContentProps = {
    children: React.ReactNode;
    id: string;
};

export default function CenterContent({ children, id }: CenterContentProps) {
    return (
        <section
            id={id}
            className="w-[min(100vw-6rem,40rem)] mx-auto flex flex-col gap-2"
        >
            {children}
        </section>
    );
}
