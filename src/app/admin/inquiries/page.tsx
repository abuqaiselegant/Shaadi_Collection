"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Search, ExternalLink } from 'lucide-react';
import styles from './inquiries.module.css';

interface Inquiry {
    id: string;
    product_name: string;
    customer_name: string;
    customer_phone: string;
    event_date: string | null;
    quantity: number;
    message: string | null;
    created_at: string;
}

type SortKey = 'created_at' | 'customer_name' | 'product_name' | 'event_date';

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortKey>('created_at');
    const [dir, setDir] = useState<'desc' | 'asc'>('desc');
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data }) => {
                setInquiries(data ?? []);
                setLoading(false);
            });
    }, []);

    const filtered = inquiries
        .filter(i => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (
                i.customer_name?.toLowerCase().includes(q) ||
                i.product_name?.toLowerCase().includes(q) ||
                i.customer_phone?.includes(q)
            );
        })
        .sort((a, b) => {
            const av = a[sort] ?? '';
            const bv = b[sort] ?? '';
            return dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        });

    const toggleSort = (key: SortKey) => {
        if (sort === key) setDir(d => d === 'desc' ? 'asc' : 'desc');
        else { setSort(key); setDir('desc'); }
    };

    const arrow = (key: SortKey) => sort === key ? (dir === 'desc' ? ' ↓' : ' ↑') : '';

    const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const openWhatsApp = (phone: string, name: string, product: string) => {
        const clean = phone.replace(/\D/g, '');
        const num = clean.startsWith('0') ? '91' + clean.slice(1) : clean.length === 10 ? '91' + clean : clean;
        const text = encodeURIComponent(`Assalamu Alaikum ${name},\n\nThank you for your inquiry about "${product}" from Shaadi Collection.\n\nWe're happy to assist you. Please let us know a good time to discuss further.\n\nJazakallahu Khayran.`);
        window.open(`https://wa.me/${num}?text=${text}`, '_blank');
    };

    return (
        <div className="container section">
            <Link href="/admin" className={styles.back}>
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>

            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Inquiries</h1>
                    <p className={styles.count}>{filtered.length} of {inquiries.length} total</p>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <Search size={14} />
                    <input
                        className={styles.searchInput}
                        placeholder="Search by name, product or phone…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.sortBtns}>
                    {(['created_at', 'customer_name', 'product_name', 'event_date'] as SortKey[]).map(k => (
                        <button key={k} className={`${styles.sortBtn} ${sort === k ? styles.sortActive : ''}`} onClick={() => toggleSort(k)}>
                            {{ created_at: 'Date', customer_name: 'Name', product_name: 'Product', event_date: 'Event' }[k]}{arrow(k)}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', fontSize: 12 }}>Loading…</p>
            ) : filtered.length === 0 ? (
                <div className={styles.empty}>
                    <p>No inquiries{search ? ' matching your search' : ' yet'}.</p>
                </div>
            ) : (
                <div className={styles.cards}>
                    {filtered.map(inq => (
                        <div key={inq.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <div className={styles.cardLeft}>
                                    <div className={styles.customerName}>{inq.customer_name}</div>
                                    <div className={styles.productRef}>
                                        <ExternalLink size={11} />
                                        {inq.product_name}
                                    </div>
                                </div>
                                <div className={styles.cardRight}>
                                    <div className={styles.cardDate}>{fmt(inq.created_at)}</div>
                                    {inq.event_date && (
                                        <div className={styles.eventDate}>Event: {new Date(inq.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.cardMeta}>
                                <span className={styles.pill}><span>📞</span>{inq.customer_phone}</span>
                                <span className={styles.pill}><span>×</span>{inq.quantity} unit{inq.quantity > 1 ? 's' : ''}</span>
                            </div>

                            {inq.message && (
                                <div className={styles.message}>
                                    {expanded === inq.id
                                        ? inq.message
                                        : inq.message.length > 120 ? inq.message.slice(0, 120) + '…' : inq.message}
                                    {inq.message.length > 120 && (
                                        <button className={styles.readMore} onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}>
                                            {expanded === inq.id ? 'Show less' : 'Read more'}
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className={styles.cardActions}>
                                <button
                                    className={styles.waBtn}
                                    onClick={() => openWhatsApp(inq.customer_phone, inq.customer_name, inq.product_name)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2a10 10 0 0 0-8.53 15.24L2 22l4.9-1.42A10 10 0 1 0 12 2zm5.47 14.05c-.23.65-1.34 1.25-1.85 1.28-.47.03-1.06.04-1.7-.11-.39-.1-.9-.25-1.54-.53-2.71-1.17-4.48-3.9-4.62-4.08-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.27c.25-.27.55-.33.73-.33l.52.01c.17.01.39-.06.62.47.23.55.78 1.91.85 2.05.07.14.12.3.02.48-.1.18-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.29-.12.56.17.28.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.34 1.46.28.14.44.12.61-.08.16-.2.7-.82.89-1.1.19-.27.38-.23.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.32.07.12.07.68-.16 1.32z"/>
                                    </svg>
                                    Reply on WhatsApp
                                </button>
                                <a href={`tel:${inq.customer_phone}`} className={styles.callBtn}>
                                    Call
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
