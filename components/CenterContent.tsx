import React from 'react';

type CenterContentProps = {
    children: React.ReactNode;
};

export default function CenterContent({ children }: CenterContentProps) {
    return (
        <section className="max-w-[min(100vw,50rem)] mx-auto flex flex-col gap-2">
            {children}
        </section>
    );
}
