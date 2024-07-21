import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownWrapperProps {
    children: string | null | undefined;
    removeParagraph?: boolean;
}

export default function MarkdownWrapper({
    children,
    removeParagraph,
}: MarkdownWrapperProps) {
    return (
        <Markdown
            skipHtml
            components={{
                li: ({ children }) => (
                    <li className="list-disc list-inside">{children}</li>
                ),
                p: ({ children }) =>
                    removeParagraph ? <>{children}</> : <p>{children}</p>,
            }}
        >
            {children}
        </Markdown>
    );
}
