import type { SocialLink } from '@/src/utils/types';
import SocialIcon, { siteHasIcon } from './SocialIcon';

export interface SocialLinkProps {
    link: SocialLink;
    hideText?: boolean;
    hideLogo?: boolean;
    haveComma?: boolean;
}

export default function SocialLink({
    link,
    hideText,
    hideLogo,
    haveComma,
}: SocialLinkProps) {
    const { href, name, site } = link;
    const text =
        name || (site ? site[0].toUpperCase() + site.slice(1) : 'Link');

    return (
        <span className="inline-block group">
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-link text-red"
                title={text}
            >
                {!hideLogo && <SocialIcon site={site} />}
                {Boolean(hideLogo || !hideText || !siteHasIcon(site)) && text}
            </a>
            {haveComma && (
                <span className="text-black !no-underline">,&nbsp;</span>
            )}
        </span>
    );
}
