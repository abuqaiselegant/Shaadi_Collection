import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    const categories = [
        { id: 'stage-decor', name: 'Stage Decor' },
        { id: 'table-settings', name: 'Table Settings' },
        { id: 'lighting', name: 'Lighting' },
        { id: 'gifts', name: 'Gifts & Favors' },
        { id: 'utility', name: 'Utility Items' },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.brand}>
                    <div className={styles.brandType}>Shaadi <em>Collection</em></div>
                    <p>Celebration essentials — crafted in Gaya since 2010. From baraat arches to walima favours, manjha garlands to inauguration ribbons.</p>
                    <div className={styles.socials}>
                        <a href="https://wa.me/918084098979" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M12 2a10 10 0 0 0-8.53 15.24L2 22l4.9-1.42A10 10 0 1 0 12 2zm5.47 14.05c-.23.65-1.34 1.25-1.85 1.28-.47.03-1.06.04-1.7-.11-.39-.1-.9-.25-1.54-.53-2.71-1.17-4.48-3.9-4.62-4.08-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.27c.25-.27.55-.33.73-.33l.52.01c.17.01.39-.06.62.47.23.55.78 1.91.85 2.05.07.14.12.3.02.48-.1.18-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.29-.12.56.17.28.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.34 1.46.28.14.44.12.61-.08.16-.2.7-.82.89-1.1.19-.27.38-.23.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.32.07.12.07.68-.16 1.32z"/>
                            </svg>
                        </a>
                        <a href="mailto:aqaisnotts@gmail.com" className={styles.socialBtn} aria-label="Email">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
                            </svg>
                        </a>
                        <span className={styles.socialBtn} style={{ opacity: 0.4, cursor: 'default' }} aria-label="Instagram coming soon">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="4"/>
                                <circle cx="12" cy="12" r="4"/>
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                            </svg>
                        </span>
                    </div>
                </div>

                <div>
                    <h4 className={styles.colTitle}>Shop</h4>
                    <ul className={styles.colLinks}>
                        {categories.map(c => (
                            <li key={c.id}>
                                <Link href={`/catalog?category=${c.id}`}>{c.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className={styles.colTitle}>Studio</h4>
                    <ul className={styles.colLinks}>
                        <li><Link href="/about">Our Story</Link></li>
                        <li><Link href="/contact">Custom Orders</Link></li>
                        <li><Link href="/contact">Bulk Enquiries</Link></li>
                        <li><Link href="/catalog">Browse Catalog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className={styles.colTitle}>Visit</h4>
                    <p className={styles.address}>
                        Shaadi Collection<br />
                        Opposite Lingi House, Chhatta Masjid<br />
                        GB Road, Gaya, Bihar — 823001
                    </p>
                    <p className={styles.contactInfo}>
                        <a href="tel:+918084098979">+91 80840 98979</a><br />
                        <a href="mailto:aqaisnotts@gmail.com">aqaisnotts@gmail.com</a>
                    </p>
                </div>
            </div>

            <div className={styles.bottom}>
                <span>© {new Date().getFullYear()} Shaadi Collection · Est. 2010</span>
                <span>Crafted with love in Gaya, Bihar</span>
                <span>Privacy · Terms</span>
            </div>
        </footer>
    );
};

export default Footer;
