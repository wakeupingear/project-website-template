import { useConfig } from '@/pages/_app';
import Link from 'next/link';
import React from 'react';

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

export default function Navbar() {
    const { sections, includePress = true } = useConfig();
    const navItems = sections.filter(({ hideInNav }) => !hideInNav);

    return (
        <nav id="page-nav" className="fixed top-0 left-0 w-full">
            {Boolean(navItems.length || includePress) && (
                <div className="flex">
                    {navItems.map(({ id, title }) => (
                        <NavItem key={id} href={`/#${id}`}>
                            {title}
                        </NavItem>
                    ))}
                    {includePress && <NavItem href="/press">Press</NavItem>}
                </div>
            )}
        </nav>
    );
}
