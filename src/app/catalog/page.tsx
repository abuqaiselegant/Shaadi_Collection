"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import styles from './catalog.module.css';

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryParam = searchParams.get('category');
    const searchQuery = searchParams.get('q') ?? '';
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [inStock, setInStock] = useState(false);
    const [sort, setSort] = useState('Featured');
    const { products, categories, loading } = useStore();

    useEffect(() => { setActiveCategory(categoryParam ?? 'all'); }, [categoryParam]);

    let filtered = products.filter(p => {
        const matchesCat   = activeCategory === 'all' || p.category_id === activeCategory;
        const matchesSearch = searchQuery
            ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesStock = inStock ? p.in_stock : true;
        return matchesCat && matchesSearch && matchesStock;
    });

    if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);

    return (
        <div>
            {/* Catalog header */}
            <div className={styles.catalogHead}>
                <div className="container">
                    <div className="section-eyebrow">
                        <span className="gold-rule"><span className="eyebrow">The Full Catalog</span></span>
                    </div>
                    <h1>Every <em>piece</em> in the collection</h1>
                    {searchQuery && (
                        <div className={styles.banner}>
                            Showing results for <strong>&ldquo;{searchQuery}&rdquo;</strong> — {filtered.length} items
                            <button onClick={() => router.push('/catalog')} style={{ marginLeft: 12, fontSize: 12, color: 'var(--muted)', cursor: 'pointer', background: 'none', border: 'none' }}>
                                ✕ Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="container">
                <div className={styles.catalogBody}>
                    {/* Sidebar filters */}
                    <aside className={styles.filters}>
                        <h3>Categories</h3>
                        <ul>
                            <li className={activeCategory === 'all' ? styles.active : ''} onClick={() => setActiveCategory('all')}>
                                <span>All Items</span>
                                <span className={styles.count}>{products.length}</span>
                            </li>
                            {categories.map(c => (
                                <li key={c.id} className={activeCategory === c.id ? styles.active : ''} onClick={() => setActiveCategory(c.id)}>
                                    <span>{c.name}</span>
                                    <span className={styles.count}>{products.filter(p => p.category_id === c.id).length}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.divider} />

                        <h3>Availability</h3>
                        <label className={styles.toggle} onClick={() => setInStock(v => !v)}>
                            <span className={`${styles.chk} ${inStock ? styles.on : ''}`}>
                                {inStock && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4 10-10" /></svg>}
                            </span>
                            <span>In Stock Only</span>
                        </label>

                        <div className={styles.divider} />
                        <h3>Need Help?</h3>
                        <div className={styles.talkCard}>
                            <p>Planning a full function? Our team can assemble a bundle for you.</p>
                            <Link href="/contact" className="btn ghost" style={{ padding: '10px 18px', fontSize: 11 }}>
                                Talk to Us
                            </Link>
                        </div>
                    </aside>

                    {/* Main grid */}
                    <main>
                        <div className={styles.catalogMeta}>
                            <span className={styles.count}>
                                {filtered.length} pieces · {activeCategory === 'all' ? 'All categories' : categories.find(c => c.id === activeCategory)?.name}
                            </span>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <span className="kbd-label">Sort</span>
                                <select className={styles.sortPill} value={sort} onChange={e => setSort(e.target.value)}>
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <p style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading…</p>
                        ) : filtered.length === 0 ? (
                            <div className={styles.emptyState}>
                                <h3>No pieces match your filter</h3>
                                <p>Try changing categories or turning off &ldquo;In Stock Only&rdquo;.</p>
                            </div>
                        ) : (
                            <div className={styles.productGrid}>
                                {filtered.map(product => {
                                    const primaryImage = product.images?.find(i => i.is_primary) ?? product.images?.[0];
                                    const categoryName = categories.find(c => c.id === product.category_id)?.name;
                                    return (
                                        <Link href={`/product/${product.id}`} key={product.id} className={styles.productCard}>
                                            <div className={styles.productImageWrapper}>
                                                {primaryImage ? (
                                                    <Image src={primaryImage.url} alt={product.name} fill className={styles.productImage} />
                                                ) : (
                                                    <div className={styles.imagePlaceholder} />
                                                )}
                                                {!product.in_stock && <div className={styles.outOfStockBadge}>Out of Stock</div>}
                                                <div className={styles.hoverCta}>
                                                    <span>View Details</span>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                                                </div>
                                            </div>
                                            <div className={styles.productInfo}>
                                                <div className={styles.productCat}>{categoryName}</div>
                                                <div className={styles.productName}>{product.name}</div>
                                                <div className={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function Catalog() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem 2rem', color: 'var(--muted)' }}>Loading catalog…</div>}>
            <CatalogContent />
        </Suspense>
    );
}
