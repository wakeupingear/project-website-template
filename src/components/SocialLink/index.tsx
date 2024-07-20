import type { SocialLink } from '@/src/utils/types';
import SocialIcon, { siteHasIcon } from './SocialIcon';

export interface SocialLinkProps {
    link: SocialLink;
    hideText?: boolean;
    haveComma?: boolean;
}

export default function SocialLink({
    link,
    hideText,
    haveComma,
}: SocialLinkProps) {
    const { href, name, site } = link;

    return (
        <span className="inline-block group">
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-link text-red"
            >
                <SocialIcon site={site} />
                {Boolean(!hideText || !siteHasIcon(site)) &&
                    (name ||
                        (site
                            ? site[0].toUpperCase() + site.slice(1)
                            : 'Link'))}
            </a>
            {haveComma && (
                <span className="text-black !no-underline">,&nbsp;</span>
            )}
        </span>
    );
}
