import { ProjectContributor } from '@/src/utils/types';
import React from 'react';
import SocialLink from '../SocialLink';

type ContributorProps = {
    contributor: ProjectContributor;
};

export default function Contributor({ contributor }: ContributorProps) {
    const { name, socialLinks } = contributor;

    return (
        <div className="flex flex-col gap-2">
            {name && <h4>{name}</h4>}
            {Boolean(socialLinks?.length) &&
                socialLinks &&
                socialLinks.map((link, i) => (
                    <SocialLink key={i} link={link} />
                ))}
        </div>
    );
}