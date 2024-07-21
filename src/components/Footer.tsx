import Link from 'next/link';
import React from 'react';
import SocialLinkRow from './SocialLink/SocialLinkRow';
import { SiteContent } from '../utils/types';

export default function Footer({ config }: SiteContent) {
    const {
        team,
        project: { socialLinks },
    } = config;
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
                            href={teamLink.href}
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
