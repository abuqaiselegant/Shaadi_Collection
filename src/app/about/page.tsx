import Link from 'next/link';
import styles from './about.module.css';

export const metadata = {
    title: 'About Us — Shaadi Collection',
    description: 'Learn about Shaadi Collection — your trusted partner for premium Indian wedding decorations in Gaya, Bihar.',
};

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>About Shaadi Collection</h1>
                    <p className={styles.heroSubtitle}>
                        Your trusted partner for premium Indian wedding decorations
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="section container">
                <div className={styles.storyGrid}>
                    <div className={styles.storyText}>
                        <h2 className={styles.sectionTitle}>Our Story</h2>
                        <p>
                            At Shaadi Collection, we believe every wedding deserves to be a masterpiece.
                            Based in Gaya, Bihar, we have been helping families across the region create
                            unforgettable celebrations with our curated range of wedding decorations,
                            elegant table settings, stunning lighting, and thoughtful gifts.
                        </p>
                        <p>
                            From intimate mehendi gatherings to grand baraat processions, our collection
                            is designed to complement every moment of your special day. We take pride in
                            offering high-quality items that reflect the richness and warmth of Indian
                            wedding traditions.
                        </p>
                    </div>
                    <div className={styles.storyValues}>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>✦</span>
                            <h3>Quality First</h3>
                            <p>Every item in our collection is carefully selected for quality and elegance.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>✦</span>
                            <h3>Local & Trusted</h3>
                            <p>Proudly serving families in Gaya and surrounding regions of Bihar.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>✦</span>
                            <h3>Personal Touch</h3>
                            <p>We work closely with each family to make their vision come to life.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories highlight */}
            <section className={styles.categoriesSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>What We Offer</h2>
                    <div className={styles.offerGrid}>
                        {['Stage Decor', 'Table Settings', 'Lighting', 'Gifts & Favors', 'Utility Items'].map(item => (
                            <div key={item} className={styles.offerItem}>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link href="/catalog" className="btn btn-primary">Browse Our Collection</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
