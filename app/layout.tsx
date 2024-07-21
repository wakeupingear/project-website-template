import '@/styles/globals.css';
import Footer from '@/src/components/Footer';
import { Inter } from 'next/font/google';
import React from 'react';
import { generateSiteMetadata } from '@/src/utils/route';

const generateMetadata = generateSiteMetadata();
export { generateMetadata };

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
