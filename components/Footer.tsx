import { useConfig } from '@/pages/_app';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
    const { teamLink, teamName } = useConfig();
    if (!teamName) return null;

    return (
        <footer id="page-footer" className="w-full text-center p-4 mt-auto">
            <p>
                &copy; {new Date().getFullYear()}{' '}
                {teamLink ? (
                    <Link
                        href={teamLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                    >
                        {teamName}
                    </Link>
                ) : (
                    teamName
                )}
            </p>
        </footer>
    );
}
