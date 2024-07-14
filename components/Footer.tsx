import SITE_CONFIG from '@/config';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
    if (!SITE_CONFIG.teamName) return null;

    return (
        <footer id="page-footer" className="w-full text-center p-4">
            <p>
                &copy; {new Date().getFullYear()}{' '}
                {SITE_CONFIG.teamLink ? (
                    <Link href={SITE_CONFIG.teamLink}>
                        {SITE_CONFIG.teamName}
                    </Link>
                ) : (
                    SITE_CONFIG.teamName
                )}
            </p>
        </footer>
    );
}
