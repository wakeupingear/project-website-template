import { useConfig } from '@/pages/_app';
import Link from 'next/link';
import React from 'react';
import SocialLinkRow from './SocialLink/SocialLinkRow';

export default function Footer() {
    const {
        team,
        project: { socialLinks },
    } = useConfig();
    const { name: teamName, link: teamLink } = team || {};

    return (
        <footer
            id="page-footer"
            className="w-full text-center p-4 mt-auto flex flex-col gap-2 justify-center items-center"
        >
            {socialLinks && <SocialLinkRow links={socialLinks} hideText />}
            {team && (
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
            )}
        </footer>
    );
}
