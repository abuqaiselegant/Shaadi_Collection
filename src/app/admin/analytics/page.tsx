"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Eye, Heart, TrendingUp, Package } from 'lucide-react';
import styles from './analytics.module.css';

interface ProductStat {
    id: string;
    name: string;
    category_id: string;
    price: number;
    views: number;
    likes: number;
    in_stock: boolean;
}

type SortKey = 'views' | 'likes' | 'name' | 'price';

export default function AnalyticsPage() {
    const [products, setProducts] = useState<ProductStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState<SortKey>('views');
    const [dir, setDir] = useState<'desc' | 'asc'>('desc');

    useEffect(() => {
        supabase
            .from('products')
            .select('id, name, category_id, price, views, likes, in_stock')
            .then(({ data }) => {
                setProducts(data ?? []);
                setLoading(false);
            });
    }, []);

    const sorted = [...products].sort((a, b) => {
        const av = a[sort] ?? 0;
        const bv = b[sort] ?? 0;
        if (typeof av === 'string' && typeof bv === 'string')
            return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
        return dir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

    const totalViews = products.reduce((s, p) => s + (p.views ?? 0), 0);
    const totalLikes = products.reduce((s, p) => s + (p.likes ?? 0), 0);
    const inStock = products.filter(p => p.in_stock).length;

    const toggleSort = (key: SortKey) => {
        if (sort === key) setDir(d => d === 'desc' ? 'asc' : 'desc');
        else { setSort(key); setDir('desc'); }
    };

    const arrow = (key: SortKey) => sort === key ? (dir === 'desc' ? ' ↓' : ' ↑') : '';

    return (
        <div className="container section">
            <Link href="/admin" className={styles.back}>
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>

            <h1 className={styles.title}>Analytics</h1>

            {/* Stat cards */}
            <div className={styles.statGrid}>
                <div className={styles.stat}>
                    <div className={styles.statIcon}><Eye size={20} /></div>
                    <div className={styles.statVal}>{totalViews.toLocaleString('en-IN')}</div>
                    <div className={styles.statLabel}>Total Views</div>
                </div>
                <div className={styles.stat}>
                    <div className={`${styles.statIcon} ${styles.iconLike}`}><Heart size={20} /></div>
                    <div className={styles.statVal}>{totalLikes.toLocaleString('en-IN')}</div>
                    <div className={styles.statLabel}>Total Likes</div>
                </div>
                <div className={styles.stat}>
                    <div className={`${styles.statIcon} ${styles.iconStock}`}><Package size={20} /></div>
                    <div className={styles.statVal}>{inStock} / {products.length}</div>
                    <div className={styles.statLabel}>In Stock</div>
                </div>
                <div className={styles.stat}>
                    <div className={`${styles.statIcon} ${styles.iconTrend}`}><TrendingUp size={20} /></div>
                    <div className={styles.statVal}>
                        {products.length > 0
                            ? products.reduce((best, p) => (p.views ?? 0) > (best.views ?? 0) ? p : best, products[0])?.name?.split(' ').slice(0, 2).join(' ')
                            : '—'}
                    </div>
                    <div className={styles.statLabel}>Most Viewed</div>
                </div>
            </div>

            {loading ? (
                <p style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', fontSize: 12 }}>Loading…</p>
            ) : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className={styles.sortable} onClick={() => toggleSort('name')}>Product{arrow('name')}</th>
                                <th className={styles.sortable} onClick={() => toggleSort('price')}>Price{arrow('price')}</th>
                                <th className={styles.sortable} onClick={() => toggleSort('views')}>Views{arrow('views')}</th>
                                <th className={styles.sortable} onClick={() => toggleSort('likes')}>Likes{arrow('likes')}</th>
                                <th>Stock</th>
                                <th>Popularity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((p, i) => {
                                const maxViews = Math.max(...products.map(x => x.views ?? 0), 1);
                                const pct = Math.round(((p.views ?? 0) / maxViews) * 100);
                                return (
                                    <tr key={p.id}>
                                        <td className={styles.rank}>{i + 1}</td>
                                        <td className={styles.name}>
                                            <Link href={`/product/${p.id}`} target="_blank">{p.name}</Link>
                                        </td>
                                        <td>₹{p.price.toLocaleString('en-IN')}</td>
                                        <td>
                                            <span className={styles.viewCount}><Eye size={12} />{p.views ?? 0}</span>
                                        </td>
                                        <td>
                                            <span className={styles.likeCount}><Heart size={12} />{p.likes ?? 0}</span>
                                        </td>
                                        <td>
                                            <span className={p.in_stock ? styles.inStock : styles.outStock}>
                                                {p.in_stock ? 'In Stock' : 'Out'}
                                            </span>
                                        </td>
                                        <td className={styles.barCell}>
                                            <div className={styles.bar}>
                                                <div className={styles.barFill} style={{ width: `${pct}%` }} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>No products yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
