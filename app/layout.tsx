import '@/styles/globals.css';
import SITE_CONFIG from '@/config';
import Footer from '@/src/components/Footer';
import MarkdownWrapper from '@/src/components/MarkdownWrapper';
import SocialLink from '@/src/components/SocialLink';
import {
    applySchema,
    recursiveStringTransform,
    SITE_CONFIG_SCHEMA,
} from '@/src/utils/schemas';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import getConfig from '@/src/lib/getConfig';

export async function generateMetadata() {
    const config = getConfig();
    const metadata: Metadata = {
        title: config.project.name,
        description: config.project.description,
    };

    return metadata;
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div
                    className={`min-h-screen flex flex-col justify-between ${inter.className}`}
                >
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
