import styles from './contact.module.css';

export const metadata = {
    title: 'Contact — Shaadi Collection',
    description: 'Reach out to Shaadi Collection, Gaya. WhatsApp, phone, email and address.',
};

const WHATSAPP = '918084098979';

export default function ContactPage() {
    const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Assalamu Alaikum, I'd like to enquire about your wedding decoration collection.")}`;

    return (
        <div>
            {/* ── Header ── */}
            <section className={styles.head}>
                <div className="container">
                    <div className="section-eyebrow">
                        <span className="gold-rule"><span className="eyebrow">Reach Us</span></span>
                    </div>
                    <h1 className={styles.headTitle}>
                        Let&apos;s plan your <em>celebration</em> together
                    </h1>
                    <p className={styles.headSub}>
                        We are a family business — not a call centre. Every inquiry goes directly
                        to the person who will help you.
                    </p>
                </div>
            </section>

            {/* ── Quote ── */}
            <div className={styles.quoteStrip}>
                <div className="container">
                    <span className={styles.quoteArabic}>وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ</span>
                    <span className={styles.quoteTransl}>"Cooperate in righteousness and piety." — Al-Ma'idah 5:2</span>
                </div>
            </div>

            {/* ── Body ── */}
            <div className={`container ${styles.body}`}>

                {/* Contact cards */}
                <div className={styles.cards}>
                    <a href={`tel:+918084098979`} className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z" />
                            </svg>
                        </div>
                        <div className={styles.cardLabel}>Phone & WhatsApp</div>
                        <div className={styles.cardValue}>+91 80840 98979</div>
                        <div className={styles.cardHint}>Tap to call</div>
                    </a>

                    <a href="mailto:aqaisnotts@gmail.com" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className={styles.cardLabel}>Email</div>
                        <div className={styles.cardValue}>aqaisnotts@gmail.com</div>
                        <div className={styles.cardHint}>Tap to email</div>
                    </a>

                    <div className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <div className={styles.cardLabel}>Visit Us</div>
                        <div className={styles.cardValue}>Opposite Lingi House</div>
                        <div className={styles.cardHint}>Chhatta Masjid, GB Road · Gaya 823001</div>
                    </div>

                    <div className={`${styles.card} ${styles.cardMuted}`}>
                        <div className={styles.cardIcon}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </div>
                        <div className={styles.cardLabel}>Instagram</div>
                        <div className={styles.cardValue} style={{ fontStyle: 'italic', fontSize: 15 }}>Coming Soon</div>
                        <div className={styles.cardHint}>@shaadicollection</div>
                    </div>
                </div>

                {/* WhatsApp CTA */}
                <div className={styles.cta}>
                    <div className={styles.ctaOrn} aria-hidden="true">✦</div>
                    <div className={styles.ctaLabel}>Fastest Response</div>
                    <h2 className={styles.ctaTitle}>
                        Message us on <em>WhatsApp</em>
                    </h2>
                    <p className={styles.ctaText}>
                        Planning a Baraat? Need a full setup for Walima? Tell us your occasion,
                        your date, and your city — we will put together options for you.
                    </p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a10 10 0 0 0-8.53 15.24L2 22l4.9-1.42A10 10 0 1 0 12 2zm5.47 14.05c-.23.65-1.34 1.25-1.85 1.28-.47.03-1.06.04-1.7-.11-.39-.1-.9-.25-1.54-.53-2.71-1.17-4.48-3.9-4.62-4.08-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.27c.25-.27.55-.33.73-.33l.52.01c.17.01.39-.06.62.47.23.55.78 1.91.85 2.05.07.14.12.3.02.48-.1.18-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.29-.12.56.17.28.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.34 1.46.28.14.44.12.61-.08.16-.2.7-.82.89-1.1.19-.27.38-.23.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.32.07.12.07.68-.16 1.32z"/>
                        </svg>
                        Start a Chat — it's free
                    </a>
                    <p className={styles.ctaReply}>بِإِذْنِ اللهِ — We reply within a few hours, insha'Allah</p>
                </div>
            </div>
        </div>
    );
}
