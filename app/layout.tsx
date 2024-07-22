import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import getConfig from '@/src/lib/getConfig';
import { Metadata } from 'next';
import { SiteRouteProps } from '@/src/utils/types';

export const generateMetadata = async (routeProps: SiteRouteProps) => {
    const config = await getConfig(routeProps);
    const metadata: Metadata = {
        title: config.project.name,
        description: config.project.descriptionStr,
    };

    return metadata;
};

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
                </div>
            </body>
        </html>
    );
}
