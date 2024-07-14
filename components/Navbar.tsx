import SITE_CONFIG from '@/config';
import Link from 'next/link';
import React from 'react';

interface NavItemProps {
    tag: string;
    children: React.ReactNode;
}

function NavItem({ tag, children }: NavItemProps) {
    return (
        <Link href={`/#${tag}`} className="p-4">
            {children}
        </Link>
    );
}

export default function Navbar() {
    const navItems = SITE_CONFIG.sections.filter(({ hideInNav }) => !hideInNav);

    return (
        <nav id="page-nav" className="fixed top-0 left-0 w-full">
            {Boolean(navItems.length) && (
                <div className="flex">
                    {navItems.map(({ id, title }) => (
                        <NavItem tag={id} key={id}>
                            {title}
                        </NavItem>
                    ))}
                </div>
            )}
        </nav>
    );
}
