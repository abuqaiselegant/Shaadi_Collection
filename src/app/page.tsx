"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import styles from './page.module.css';

/* ---- Scroll reveal hook ---- */
function useReveal() {
    const ref = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { setInView(true); io.unobserve(el); } });
        }, { threshold: 0.12 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return { ref, inView };
}

/* ---- Islamic ornament SVG ---- */
function Ornament({ size = 60, className = '' }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="50,5 61,39 95,39 67,60 78,94 50,73 22,94 33,60 5,39 39,39" />
            <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="34" />
        </svg>
    );
}

/* ---- Wedding sketch backdrop ---- */
function WeddingSketch() {
    return (
        <svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            fill="none" stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity={0.18}>
            {/* Skyline domes */}
            <g opacity="0.55">
                <path d="M0 620 L80 620 L80 580 Q100 560 120 580 L120 620 L200 620 L200 560 Q215 520 230 560 L230 620 L330 620 L330 540 Q360 480 390 540 L390 620 L520 620 L520 570 Q540 540 560 570 L560 620 L680 620 L680 530 Q720 460 760 530 L760 620 L900 620 L900 585 Q920 555 940 585 L940 620 L1080 620 L1080 545 Q1110 490 1140 545 L1140 620 L1280 620 L1280 575 Q1300 545 1320 575 L1320 620 L1440 620 L1440 555 Q1470 510 1500 555 L1500 620 L1600 620" />
                <circle cx="760" cy="500" r="12" /><path d="M750 500 L770 500 M760 488 L760 518" />
            </g>
            {/* Central arch */}
            <g transform="translate(540,180)">
                <path d="M0 530 L520 530 L560 560 L-40 560 Z" />
                <path d="M20 530 L20 120 M500 530 L500 120" />
                <path d="M20 120 Q260 -80 500 120" />
                <path d="M40 125 Q260 -40 480 125" />
                {/* Crescent */}
                <path d="M260 30 A36 36 0 1 1 252 -10 A28 28 0 1 0 260 30 Z" fill="rgba(201,162,75,0.3)" stroke="none" />
                <path d="M300 10 L304 22 L316 22 L306 30 L310 42 L300 34 L290 42 L294 30 L284 22 L296 22 Z" fill="rgba(201,162,75,0.3)" stroke="none" />
                {/* Drapes */}
                <path d="M80 128 Q90 260 80 380 Q100 410 120 380 Q115 260 130 140" />
                <path d="M440 140 Q455 260 470 380 Q490 410 510 380 Q500 260 510 128" />
            </g>
            {/* Lanterns */}
            <g>
                <path d="M180 60 L180 220" /><circle cx="180" cy="240" r="18" />
                <path d="M170 240 L190 240 M180 230 L180 250" />
                <path d="M120 60 L120 170" /><circle cx="120" cy="186" r="12" />
            </g>
            {/* Marigold garland */}
            <path d="M0 110 Q200 50 400 130 Q600 210 800 130 Q1000 50 1200 130 Q1400 210 1600 110" />
            {Array.from({ length: 40 }).map((_, i) => {
                const x = (i + 0.5) * (1600 / 40);
                const y = 110 + Math.sin(i / 40 * Math.PI * 4) * 40;
                return <circle key={i} cx={x} cy={y} r="3.5" />;
            })}
        </svg>
    );
}

const HEADLINES = [
    { line1: 'For the moments', em: 'your family', line2: 'will never forget', urdu: false },
    { line1: 'Because some days', em: 'deserve to last', line2: 'forever', urdu: false },
    { line1: 'Where every', em: 'celebration', line2: 'becomes an heirloom', urdu: false },
    { line1: 'ہر', em: 'شادی', line2: 'کو سجاؤ، یادگار بناؤ', urdu: true },
    { line1: 'خوشیوں کو', em: 'خوبصورتی', line2: 'سے سجائیں', urdu: true },
];

/* ---- Hero section ---- */
function Hero({ onCTA }: { onCTA: () => void }) {
    const [open, setOpen] = useState(false);
    const [headIdx, setHeadIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => { const t = setTimeout(() => setOpen(true), 300); return () => clearTimeout(t); }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setHeadIdx(i => (i + 1) % HEADLINES.length);
                setVisible(true);
            }, 600);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const h = HEADLINES[headIdx];

    return (
        <section className={`${styles.hero} ${open ? styles.heroOpen : ''}`}>
            {/* Cinematic dark backdrop */}
            <div className={styles.heroBg}>
                <WeddingSketch />
            </div>
            <div className={styles.vignette} />
            <div className={`${styles.curtain} ${styles.curtainLeft}`} />
            <div className={`${styles.curtain} ${styles.curtainRight}`} />

            {/* Floating ornaments */}
            <Ornament size={80} className={`${styles.heroOrn} ${styles.ornOne}`} />
            <Ornament size={80} className={`${styles.heroOrn} ${styles.ornTwo}`} />

            <div className={styles.heroContent}>
                <div className={styles.copy}>
                    <div className="section-eyebrow">
                        <span className="gold-rule">
                            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Est. 2010 · Gaya, Bihar</span>
                        </span>
                    </div>
                    <h1 className={`${styles.heroTitle} ${h.urdu ? styles.heroTitleUrdu : ''} ${visible ? styles.headIn : styles.headOut}`}>
                        {h.line1} <em>{h.em}</em>{h.line2 ? <><br />{h.line2}</> : null}
                    </h1>
                    <div className={styles.headDots}>
                        {HEADLINES.map((_, i) => (
                            <span key={i} className={`${styles.headDot} ${i === headIdx ? styles.headDotActive : ''}`} />
                        ))}
                    </div>
                    <p className={styles.heroSub}>
                        From stage drapes to shagun envelopes, cash garlands to walima favours — curated essentials for baraat, manjha, haldi, mehndi, nikah, walima, birthdays & inaugurations.
                    </p>
                    <div className={styles.ctaRow}>
                        <button className="btn gold" onClick={onCTA}>
                            Shop the Collection
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </button>
                        <Link href="/about" className="btn ghost" style={{ color: 'var(--gold-soft)', borderColor: 'rgba(201,162,75,0.5)' }}>
                            Our Story
                        </Link>
                    </div>
                </div>
                <div className={styles.heroSide}>
                    <div className={styles.heroSideInner}>
                        <div className={styles.heroPlaceholder} />
                        <div className={styles.shimmer} />
                        <div className={styles.caption}>
                            <span className={styles.captionKey}>Featured · Decor</span>
                            <span className={styles.captionVal}>Crescent Stage Drape Set</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.metaRow}>
                <span>Spring–Summer Collection · 2026</span>
                <span>Scroll ↓</span>
                <span>Gaya, Bihar · 823001</span>
            </div>
        </section>
    );
}

/* ---- Category marquee ---- */
function Marquee() {
    const items = ['Baraat', 'Walima', 'Shaadi', 'Manjha', 'Mehndi', 'Engagement', 'Haldi', 'Birthday', 'Inauguration', 'Aqiqa', 'Reception'];
    return (
        <div className={styles.strip}>
            <div className={styles.marquee}>
                {[...items, ...items].map((w, i) => (
                    <React.Fragment key={i}>
                        <span>{w}</span>
                        <span className={styles.dot} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

/* ---- Category grid ---- */
function CategoryGrid() {
    const { categories } = useStore();
    const { ref, inView } = useReveal();

    return (
        <section className="section">
            <div className="container">
                <div className={`reveal ${inView ? 'in' : ''} ${styles.sectionHead}`} ref={ref as React.RefObject<HTMLDivElement>}>
                    <div>
                        <div className="section-eyebrow">
                            <span className="gold-rule"><span className="eyebrow">Browse by Category</span></span>
                        </div>
                        <h2 className={styles.sectionH2}>Curated for every<br /><em>ceremony</em> & ritual</h2>
                    </div>
                    <p className={styles.sectionSide}>Five in-house collections, hand-assembled in Gaya — from intimate mehndi setups to full baraat, nikah and walima builds.</p>
                </div>

                <div className={`reveal-stagger ${inView ? 'in' : ''} ${styles.catGrid}`}>
                    {categories.map((cat, i) => (
                        <Link href={`/catalog?category=${cat.id}`} key={cat.id} className={styles.catCard}>
                            <div className={styles.catMedia}>
                                {cat.image ? (
                                    <Image src={cat.image} alt={cat.name} fill className={styles.catImage} />
                                ) : (
                                    <div className={styles.catPlaceholder} data-tone="maroon" />
                                )}
                            </div>
                            <div className={styles.catOverlay} />
                            <div className={styles.catArrCircle}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10M17 7v10H7" /></svg>
                            </div>
                            <div className={styles.catLabel}>
                                <div>
                                    <div className={styles.catCount}>0{i + 1}</div>
                                    <div className={styles.catName}>{cat.name}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---- Ceremonies ribbon ---- */
function CeremoniesRibbon() {
    const ceremonies = ['Baraat', 'Walima', 'Mehndi', 'Haldi', 'Manjha', 'Nikah', 'Birthday', 'Aqiqa', 'Inauguration', 'Reception'];
    const { ref, inView } = useReveal();
    return (
        <section className={`section tight ${styles.ceremoniesSection}`}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className={`reveal ${inView ? 'in' : ''}`} ref={ref as React.RefObject<HTMLDivElement>}>
                    <div className="section-eyebrow">
                        <span className="gold-rule" style={{ color: 'var(--gold-soft)' }}>
                            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>We dress every ceremony</span>
                        </span>
                    </div>
                    <h2 className={styles.ceremoniesH2}>
                        From the first <em>manjha</em> to the last <em>walima</em>
                    </h2>
                </div>
                <div className={styles.ceremoniesGrid}>
                    {ceremonies.map((c, i) => (
                        <div key={c} className={styles.ceremonyCell} style={i === 0 ? { background: 'rgba(107,16,40,0.25)' } : {}}>
                            <div className="kbd-label" style={{ color: 'var(--gold-soft)' }}>0{i + 1}</div>
                            <div className={styles.ceremonyName}>{c}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---- Trending section ---- */
function TrendingRow() {
    const { products, categories } = useStore();
    const trending = products.slice(0, 3);
    const { ref, inView } = useReveal();

    if (trending.length === 0) return null;

    return (
        <section className="section" style={{ background: 'var(--ivory-2)' }}>
            <div className="container">
                <div className={`reveal ${inView ? 'in' : ''} ${styles.sectionHead}`} ref={ref as React.RefObject<HTMLDivElement>}>
                    <div>
                        <div className="section-eyebrow">
                            <span className="gold-rule"><span className="eyebrow">Trending Now</span></span>
                        </div>
                        <h2 className={styles.sectionH2}>Wedding-season<br /><em>favourites</em></h2>
                    </div>
                    <p className={styles.sectionSide}>Most-loved pieces this season — trusted by families & event planners across Bihar, Jharkhand and UP.</p>
                </div>
                <div className={`reveal-stagger ${inView ? 'in' : ''} prod-grid`}>
                    {trending.map(product => {
                        const primaryImage = product.images?.find(i => i.is_primary) ?? product.images?.[0];
                        const categoryName = categories.find(c => c.id === product.category_id)?.name;
                        return (
                            <Link href={`/product/${product.id}`} key={product.id} className="card">
                                <div className="media">
                                    {primaryImage ? (
                                        <Image src={primaryImage.url} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)' }} />
                                    )}
                                    {!product.in_stock && <div className="stock-badge">Out of Stock</div>}
                                    <div className="hover-cta">
                                        <span>View Details</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                                <div className="body">
                                    <div className="cat">{categoryName}</div>
                                    <div className="name">{product.name}</div>
                                    <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link href="/catalog" className="btn">View All Products</Link>
                </div>
            </div>
        </section>
    );
}

/* ---- Story aside ---- */
function StoryAside() {
    const { ref, inView } = useReveal();
    return (
        <section className="section tight">
            <div className="container">
                <div className={`reveal ${inView ? 'in' : ''} ${styles.twoCol}`} ref={ref as React.RefObject<HTMLDivElement>}>
                    <div>
                        <div className="section-eyebrow">
                            <span className="gold-rule"><span className="eyebrow">The Atelier · Gaya</span></span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(32px, 4vw, 54px)', marginTop: 8 }}>
                            Keepsakes built for <em style={{ color: 'var(--maroon)' }}>modern</em> celebrations
                        </h2>
                        <p style={{ marginTop: 20, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.75, maxWidth: 520 }}>
                            Since 2010, Shaadi Collection has been Gaya's trusted address for celebration essentials. Every piece — from a modest shagun envelope to a full stage drape — is assembled and finished with care.
                        </p>
                        <Link href="/about" className="btn ghost" style={{ marginTop: 26, display: 'inline-flex' }}>
                            Our Story
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </Link>
                    </div>
                    <div className={styles.asideBlock}>
                        <div className="eyebrow" style={{ color: 'var(--gold-soft)', marginBottom: 10 }}>Bespoke · On Request</div>
                        <h3 className={styles.asideH3}>Plan your <em>entire function</em> with us</h3>
                        <p className={styles.asideSub}>Baraat arches, manjha garlands, haldi platters, walima favours, birthday setups and shop inaugurations — delivered to your venue.</p>
                        <Link href="/contact" className="btn gold" style={{ marginTop: 22, display: 'inline-flex' }}>
                            Get in Touch
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---- Page ---- */
export default function Home() {
    return (
        <div>
            <Hero onCTA={() => { window.location.href = '/catalog'; }} />
            <Marquee />
            <CategoryGrid />
            <CeremoniesRibbon />
            <TrendingRow />
            <StoryAside />
        </div>
    );
}
