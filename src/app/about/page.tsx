import Link from 'next/link';
import styles from './about.module.css';

export const metadata = {
    title: 'About Us — Shaadi Collection',
    description: 'Shaadi Collection — wedding decoration atelier in Gaya, Bihar. Handcrafted celebration pieces for every Muslim wedding ceremony.',
};

const values = [
    {
        arabic: 'إِتْقَان',
        transliteration: 'Itqan',
        meaning: 'Excellence',
        text: 'Every item we carry is chosen with deliberate care. We do not stock what we would not use for our own family.',
    },
    {
        arabic: 'أَمَانَة',
        transliteration: 'Amanah',
        meaning: 'Trust',
        text: 'We have served Gaya families for years. Our word is our bond — on price, on availability, on delivery.',
    },
    {
        arabic: 'كَرَم',
        transliteration: 'Karam',
        meaning: 'Generosity',
        text: 'A wedding is a gift to a family. We price fairly and always go the extra step to make your occasion feel special.',
    },
];

const ceremonies = [
    'Nikah', 'Baraat', 'Walima', 'Mehndi', 'Manjha', 'Haldi', 'Milad', 'Aqeeqah', 'Bismillah', 'Inaugurations',
];

export default function AboutPage() {
    return (
        <div>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroOrn} aria-hidden="true">
                    <svg width="320" height="320" viewBox="0 0 200 200" fill="none">
                        {[0,45,90,135].map(r => (
                            <rect key={r} x="85" y="10" width="30" height="180"
                                transform={`rotate(${r} 100 100)`}
                                fill="rgba(201,162,75,0.08)" />
                        ))}
                        <circle cx="100" cy="100" r="60" stroke="rgba(201,162,75,0.15)" strokeWidth="1" fill="none" />
                        <circle cx="100" cy="100" r="40" stroke="rgba(201,162,75,0.10)" strokeWidth="1" fill="none" />
                    </svg>
                </div>
                <div className="container">
                    <div className={styles.heroInner}>
                        <div className="eyebrow" style={{ color: 'var(--gold-soft)', marginBottom: 16 }}>Our Story</div>
                        <h1 className={styles.heroTitle}>
                            Celebrating the <em>sacred</em><br />moments of life
                        </h1>
                        <p className={styles.heroSub}>
                            A wedding decoration atelier rooted in Gaya, Bihar — serving Muslim families
                            across India with handcrafted pieces for every ceremony.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Quranic Quote ── */}
            <section className={styles.quoteSection}>
                <div className="container">
                    <div className={styles.quoteCard}>
                        <div className={styles.quoteArabic}>
                            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
                        </div>
                        <div className={styles.quoteTranslation}>
                            "And of His signs is that He created for you mates from among yourselves,
                            that you may find tranquillity in them."
                        </div>
                        <div className={styles.quoteRef}>— Surah Ar-Rum, 30:21</div>
                    </div>
                </div>
            </section>

            {/* ── Story ── */}
            <section className={`${styles.storySection} container`}>
                <div className={styles.storyGrid}>
                    <div className={styles.storyVisual}>
                        <div className={styles.storyFrame}>
                            <div className={styles.storyPlaceholder} />
                            <div className={styles.storyTag}>
                                <span className={styles.storyTagKey}>Est.</span>
                                <span className={styles.storyTagVal}>Gaya, Bihar</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.storyText}>
                        <div className="section-eyebrow">
                            <span className="gold-rule"><span className="eyebrow">Who We Are</span></span>
                        </div>
                        <h2 className={styles.storyH2}>
                            Born from a love of <em>celebration</em>
                        </h2>
                        <p>
                            Shaadi Collection began as a simple idea — that every Muslim family in Gaya
                            deserves access to beautiful, high-quality wedding décor without travelling
                            to distant cities or paying premium-city prices.
                        </p>
                        <p>
                            From cash garlands draped on the groom to delicate envelope sets placed
                            on reception tables, every piece in our collection is chosen to honour
                            the spirit of the occasion. We understand the ceremonies — Nikah, Baraat,
                            Walima, Mehndi — because we have celebrated them ourselves.
                        </p>
                        <p>
                            We are a local business, a Muslim-owned family atelier, and a proud part
                            of the Gaya community. When you trust us with your wedding, you are not
                            just buying décor — you are letting us be a small part of your story.
                        </p>
                        <Link href="/catalog" className="btn" style={{ marginTop: 8 }}>
                            Browse the Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Hadith Quote ── */}
            <section className={styles.hadithSection}>
                <div className="container">
                    <div className={styles.hadithInner}>
                        <div className={styles.hadithArabic}>تَجَمَّلُوا</div>
                        <p className={styles.hadithText}>
                            "Beautify yourselves." — The Prophet ﷺ encouraged adornment and celebration
                            on occasions of joy. A wedding is among the greatest.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className={`${styles.valuesSection} container`}>
                <div className="section-eyebrow" style={{ marginBottom: 12 }}>
                    <span className="gold-rule"><span className="eyebrow">Our Principles</span></span>
                </div>
                <h2 className={styles.valuesH2}>
                    Three words that guide <em>everything</em> we do
                </h2>
                <div className={styles.valuesGrid}>
                    {values.map(v => (
                        <div key={v.arabic} className={styles.valueCard}>
                            <div className={styles.valueArabic}>{v.arabic}</div>
                            <div className={styles.valueMeta}>
                                <span className={styles.valueTranslit}>{v.transliteration}</span>
                                <span className={styles.valueDot}>·</span>
                                <span className={styles.valueMeaning}>{v.meaning}</span>
                            </div>
                            <p className={styles.valueText}>{v.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Ceremonies ── */}
            <section className={styles.ceremoniesSection}>
                <div className="container">
                    <div className="section-eyebrow" style={{ marginBottom: 12 }}>
                        <span className="gold-rule" style={{ '--rule-color': 'rgba(201,162,75,0.3)' } as React.CSSProperties}>
                            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>What We Cover</span>
                        </span>
                    </div>
                    <h2 className={styles.ceremoniesH2}>
                        Every occasion, <em>beautifully</em> adorned
                    </h2>
                    <div className={styles.ceremoniesPills}>
                        {ceremonies.map(c => (
                            <span key={c} className={styles.ceremonyPill}>{c}</span>
                        ))}
                    </div>
                    <p className={styles.ceremoniesSub}>
                        Whether it is a quiet Nikah at the masjid or a grand Baraat procession,
                        we have the right piece for every moment.
                    </p>
                    <Link href="/catalog" className="btn ghost" style={{ marginTop: 32 }}>
                        Shop All Pieces
                    </Link>
                </div>
            </section>

            {/* ── Closing Quote ── */}
            <section className={`${styles.closingSection} container`}>
                <div className={styles.closingCard}>
                    <div className={styles.closingArabic}>بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</div>
                    <p className={styles.closingTranslation}>
                        "May Allah bless you both, and may He bless your union and bring you
                        together in all that is good."
                    </p>
                    <p className={styles.closingRef}>— Du'a for the bride and groom (Tirmidhi)</p>
                </div>
            </section>
        </div>
    );
}
