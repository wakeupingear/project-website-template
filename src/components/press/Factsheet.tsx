import { useConfig } from '@/pages/_app';
import React from 'react';
import SocialLink from '../SocialLink';

interface FactEntryProps {
    title: string;
    children: React.ReactNode;
}

function FactEntry({ title, children }: FactEntryProps) {
    return (
        <div className="flex flex-col gap-0">
            <h3 className="font-semibold">{title}</h3>
            <p>{children}</p>
        </div>
    );
}

export default function Factsheet() {
    const {
        team: { name: teamName, link: teamLink },
        project: { releaseDate, platforms, ratings, socialLinks },
    } = useConfig();

    return (
        <div className="flex flex-col gap-4">
            <h2>Factsheet</h2>
            <FactEntry title="Created By">
                {teamLink ? (
                    <a
                        href={teamLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                    >
                        {teamName}
                    </a>
                ) : (
                    teamName
                )}
            </FactEntry>
            <FactEntry title="Release Date">
                {!releaseDate
                    ? 'TBD'
                    : typeof releaseDate === 'number'
                    ? new Date(releaseDate).toLocaleDateString()
                    : typeof releaseDate === 'string'
                    ? releaseDate
                    : releaseDate.toLocaleDateString()}
            </FactEntry>
            {Boolean(platforms?.length) && platforms && (
                <FactEntry title="Platforms">
                    {platforms.map((link, i) => (
                        <SocialLink
                            link={link}
                            key={`platform-${i}`}
                            haveComma={i < platforms.length - 1}
                        />
                    ))}
                </FactEntry>
            )}
            {Boolean(ratings?.length) && ratings && (
                <FactEntry title="Ratings">
                    {ratings.map((link, i) => (
                        <SocialLink
                            link={link}
                            key={`ratings-${i}`}
                            haveComma={i < ratings.length - 1}
                        />
                    ))}
                </FactEntry>
            )}
            {Boolean(socialLinks?.length) && socialLinks && (
                <FactEntry title="Socials">
                    {socialLinks.map((link, i) => (
                        <SocialLink
                            link={link}
                            key={`social-${i}`}
                            haveComma={i < socialLinks.length - 1}
                        />
                    ))}
                </FactEntry>
            )}
        </div>
    );
}
