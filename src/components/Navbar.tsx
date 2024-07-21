import Link from 'next/link';
import React from 'react';
import { SiteContent } from '../utils/types';

interface NavItemProps {
    href: string;
    children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
    return (
        <Link href={href} className="p-4">
            {children}
        </Link>
    );
}

export default function Navbar({ config }: SiteContent) {
    const {
        homepage: { content },
        press,
    } = config;
    const navItems = content.filter(({ hideInNav }) => !hideInNav);

    return (
        <nav id="page-nav" className="fixed top-0 left-0 w-full z-50">
            {Boolean(navItems.length && press) && (
                <div className="flex">
                    {navItems.map(({ id, title }) => (
                        <NavItem key={id} href={`/#${id}`}>
                            {title}
                        </NavItem>
                    ))}
                    {press && <NavItem href="/press">Press</NavItem>}
                </div>
            )}
        </nav>
    );
}
