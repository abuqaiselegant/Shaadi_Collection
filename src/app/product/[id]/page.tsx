"use client";

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { supabase } from '@/lib/supabase';
import { getSessionId } from '@/lib/utils';
import styles from './product.module.css';

interface PageProps { params: Promise<{ id: string }>; }

/* ---- Inquiry modal ---- */
function InquiryModal({ productName, onClose }: { productName: string; onClose: () => void }) {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', event_date: '', quantity: '1', message: '' });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        await supabase.from('inquiries').insert({
            product_name: productName,
            customer_name: form.name,
            customer_phone: form.phone,
            event_date: form.event_date || null,
            quantity: Number(form.quantity),
            message: form.message,
        });
        setSubmitting(false);
        setSubmitted(true);

        const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
        const text = encodeURIComponent(
            `Hi, I'm interested in "${productName}".\nName: ${form.name}\nPhone: ${form.phone}\nEvent Date: ${form.event_date || 'N/A'}\nQty: ${form.quantity}\n${form.message}`
        );
        const url = whatsapp ? `https://wa.me/${whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
        window.open(url, '_blank');
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={onClose}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12" /></svg>
                </button>
                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
                        <h3>Your inquiry is with us</h3>
                        <p className="lead">We&apos;ll reach out on WhatsApp within a few hours, insha&apos;Allah.</p>
                        <button className="btn" onClick={onClose} style={{ marginTop: 20 }}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="eyebrow" style={{ marginBottom: 6 }}>Inquire About</div>
                        <h3>{productName}</h3>
                        <p className="lead">Tell us about your event — we&apos;ll follow up on WhatsApp with pricing and availability.</p>
                        <form onSubmit={submit}>
                            <div className="field"><label>Your Name</label><input placeholder="Aisha Khan" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="field"><label>Phone / WhatsApp</label><input placeholder="+91 98765 43210" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                            <div className="field-row">
                                <div className="field"><label>Event Date</label><input type="date" value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })} /></div>
                                <div className="field"><label>Quantity</label><input type="number" min="1" placeholder="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} /></div>
                            </div>
                            <div className="field"><label>Message</label><textarea placeholder="Delivery city, any customisations…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
                            <button className={`btn ${submitting ? 'disabled' : ''}`} type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                                {submitting ? 'Sending…' : 'Send Inquiry via WhatsApp'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

/* ---- Page ---- */
export default function ProductPage({ params }: PageProps) {
    const { id } = use(params);
    const { products, categories, loading } = useStore();
    const [activeThumb, setActiveThumb] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [shareFlash, setShareFlash] = useState(false);
    const [modal, setModal] = useState(false);

    const product = products.find(p => p.id === id);
    const sessionId = typeof window !== 'undefined' ? getSessionId() : '';

    useEffect(() => {
        if (!product) return;

        // Track view
        supabase.from('products').update({ views: (product.views ?? 0) + 1 }).eq('id', id);

        // Check if already liked
        supabase.from('product_likes')
            .select('id')
            .eq('product_id', id)
            .eq('session_id', sessionId)
            .maybeSingle()
            .then(({ data }) => setLiked(!!data));

        setLikes(product.likes ?? 0);
    }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLike = async () => {
        if (!product) return;
        if (liked) {
            await supabase.from('product_likes').delete().eq('product_id', id).eq('session_id', sessionId);
            await supabase.from('products').update({ likes: Math.max(0, likes - 1) }).eq('id', id);
            setLikes(l => Math.max(0, l - 1));
        } else {
            await supabase.from('product_likes').insert({ product_id: id, session_id: sessionId });
            await supabase.from('products').update({ likes: likes + 1 }).eq('id', id);
            setLikes(l => l + 1);
        }
        setLiked(v => !v);
    };

    const handleShare = () => {
        navigator.clipboard?.writeText(window.location.href).catch(() => {});
        setShareFlash(true);
        setTimeout(() => setShareFlash(false), 1400);
    };

    if (loading) return <div className="container section" style={{ color: 'var(--muted)' }}>Loading…</div>;
    if (!product) return <div className="container section">Product not found</div>;

    const images = product.images ?? [];
    const activeImage = images[activeThumb];
    const categoryName = categories.find(c => c.id === product.category_id)?.name;
    const related = products.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 3);

    return (
        <div>
            <div className={`container ${styles.productPage}`}>
                <Link href="/catalog" className={styles.backLink}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 5l-7 7 7 7" /></svg>
                    Back to Catalog
                </Link>

                <div className={styles.pdGrid}>
                    {/* Media */}
                    <div className={styles.pdMedia}>
                        <div className={styles.pdMain}>
                            {activeImage ? (
                                <Image src={activeImage.url} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
                            ) : (
                                <div className={styles.pdPlaceholder} />
                            )}
                            {!product.in_stock && <div className="stock-badge">Out of Stock</div>}
                            <div style={{ position: 'absolute', left: 14, top: 14 }}>
                                <span className="tag gold">{categoryName}</span>
                            </div>
                        </div>
                        {images.length > 1 && (
                            <div className={styles.pdThumbs}>
                                {images.map((img, i) => (
                                    <div key={img.id} className={`${styles.pdThumb} ${activeThumb === i ? styles.active : ''}`} onClick={() => setActiveThumb(i)}>
                                        <Image src={img.url} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                                {product.video_url && (
                                    <a href={product.video_url} target="_blank" rel="noopener noreferrer" className={`${styles.pdThumb} ${styles.videoThumb}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className={styles.pdInfo}>
                        <span className={styles.pdCat}>{categoryName} · SKU {product.id.slice(0, 8).toUpperCase()}</span>
                        <h1 className={styles.pdTitle}>{product.name}</h1>

                        <div className={styles.priceRow}>
                            <div className={styles.price}>
                                <span className={styles.priceUnit}>₹</span>
                                {product.price.toLocaleString('en-IN')}
                            </div>
                            {product.in_stock
                                ? <span className="tag" style={{ background: '#E2F0E6', color: '#2E6E41', borderColor: '#C9E3D0' }}>● In Stock</span>
                                : <span className="tag" style={{ background: '#F4DCD6', color: '#94302B', borderColor: '#ECC6BE' }}>● Out of Stock</span>}
                        </div>

                        <p className={styles.pdDesc}>{product.description || 'A handcrafted celebration piece, finished with traditional motifs and premium materials. Suitable for baraat, walima, manjha, mehndi, haldi, birthdays & inaugurations.'}</p>

                        <div className={styles.pdActions}>
                            <button
                                className={`btn ${product.in_stock ? '' : 'disabled'}`}
                                onClick={() => setModal(true)}
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path d="M12 2a10 10 0 0 0-8.53 15.24L2 22l4.9-1.42A10 10 0 1 0 12 2zm5.47 14.05c-.23.65-1.34 1.25-1.85 1.28-.47.03-1.06.04-1.7-.11-.39-.1-.9-.25-1.54-.53-2.71-1.17-4.48-3.9-4.62-4.08-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.27c.25-.27.55-.33.73-.33l.52.01c.17.01.39-.06.62.47.23.55.78 1.91.85 2.05.07.14.12.3.02.48-.1.18-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.29-.12.56.17.28.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.34 1.46.28.14.44.12.61-.08.16-.2.7-.82.89-1.1.19-.27.38-.23.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.32.07.12.07.68-.16 1.32z"/>
                                </svg>
                                Inquire via WhatsApp
                            </button>
                            <button className={`${styles.likeBtn} ${liked ? styles.liked : ''}`} onClick={handleLike} aria-label="Like">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
                                    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
                                </svg>
                                <span className={styles.likeCount}>{likes}</span>
                            </button>
                            <button className={`${styles.shareBtn} ${shareFlash ? styles.copiedNow : ''}`} onClick={handleShare} aria-label="Share">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 14 21 3M14 3h7v7" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                                </svg>
                                <span className={styles.copied}>Link copied</span>
                            </button>
                        </div>

                        <hr className="hr-gold" />
                        <p style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--f-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            Crafted in Gaya · Shipped across India
                        </p>
                    </div>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <section style={{ marginTop: 100 }}>
                        <div className="section-eyebrow">
                            <span className="gold-rule"><span className="eyebrow">You May Also Love</span></span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', marginBottom: 32, marginTop: 8 }}>
                            From the same <em style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>collection</em>
                        </h2>
                        <div className="prod-grid">
                            {related.map(p => {
                                const img = p.images?.find(i => i.is_primary) ?? p.images?.[0];
                                const catName = categories.find(c => c.id === p.category_id)?.name;
                                return (
                                    <Link href={`/product/${p.id}`} key={p.id} className="card">
                                        <div className="media">
                                            {img ? (
                                                <Image src={img.url} alt={p.name} fill style={{ objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)' }} />
                                            )}
                                            {!p.in_stock && <div className="stock-badge">Out of Stock</div>}
                                            <div className="hover-cta">
                                                <span>View Details</span>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                        <div className="body">
                                            <div className="cat">{catName}</div>
                                            <div className="name">{p.name}</div>
                                            <div className="price">₹{p.price.toLocaleString('en-IN')}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>

            {modal && <InquiryModal productName={product.name} onClose={() => setModal(false)} />}
        </div>
    );
}
