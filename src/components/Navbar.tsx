"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [q, setQ] = useState('');
    const pathname = usePathname();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (q.trim()) {
            router.push(`/catalog?q=${encodeURIComponent(q.trim())}`);
            setQ('');
            inputRef.current?.blur();
        }
    };

    const links = [
        { href: '/', label: 'Home' },
        { href: '/catalog', label: 'Catalog' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.mark}>ش</span>
                    <span className={styles.logoType}>Shaadi <em>Collection</em></span>
                </Link>

                <div className={styles.links}>
                    {links.map(l => (
                        <Link key={l.href} href={l.href}
                            className={`${styles.link} ${isActive(l.href) ? styles.current : ''}`}>
                            {l.label}
                        </Link>
                    ))}
                </div>

                <div className={styles.right}>
                    <form className={styles.search} onSubmit={handleSearch}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
                        </svg>
                        <input ref={inputRef} placeholder="Search decor, garlands, envelopes..."
                            value={q} onChange={e => setQ(e.target.value)} />
                    </form>
                    <Link href="/admin" className={styles.iconBtn} aria-label="Admin Panel">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/>
                        </svg>
                    </Link>
                    <button className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
                        onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className={styles.mobileMenu}>
                    {links.map(l => (
                        <Link key={l.href} href={l.href}
                            className={`${styles.mobileLink} ${isActive(l.href) ? styles.current : ''}`}
                            onClick={() => setMobileOpen(false)}>
                            {l.label}
                        </Link>
                    ))}
                    <form className={styles.mobileSearch} onSubmit={handleSearch}>
                        <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
                        <button type="submit" className="btn" style={{ padding: '10px 18px', fontSize: 12 }}>Go</button>
                    </form>
                </div>
            )}
        </nav>
    );
}
