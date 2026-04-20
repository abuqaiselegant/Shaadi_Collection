"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Plus, Trash2, Search, Tag } from 'lucide-react';
import styles from './categories.module.css';

interface Category {
    id: string;
    name: string;
    created_at: string;
    product_count?: number;
}

type SortKey = 'name' | 'created_at' | 'product_count';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortKey>('name');
    const [dir, setDir] = useState<'asc' | 'desc'>('asc');
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ id: '', name: '' });
    const [error, setError] = useState('');

    const load = async () => {
        const { data: cats } = await supabase.from('categories').select('*');
        const { data: prods } = await supabase.from('products').select('category_id');
        const counts: Record<string, number> = {};
        prods?.forEach(p => { counts[p.category_id] = (counts[p.category_id] ?? 0) + 1; });
        setCategories((cats ?? []).map(c => ({ ...c, product_count: counts[c.id] ?? 0 })));
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const filtered = categories
        .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const av = a[sort] ?? '';
            const bv = b[sort] ?? '';
            if (typeof av === 'number' && typeof bv === 'number')
                return dir === 'asc' ? av - bv : bv - av;
            return dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        });

    const toggleSort = (key: SortKey) => {
        if (sort === key) setDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSort(key); setDir('asc'); }
    };
    const arrow = (key: SortKey) => sort === key ? (dir === 'asc' ? ' ↑' : ' ↓') : '';

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.id || !form.name) return;
        const slug = form.id.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        setSaving(true);
        const { error: err } = await supabase.from('categories').insert({ id: slug, name: form.name });
        setSaving(false);
        if (err) {
            setError(err.message.includes('duplicate') ? 'A category with this ID already exists.' : err.message);
            return;
        }
        setForm({ id: '', name: '' });
        setAdding(false);
        load();
    };

    const handleDelete = async (id: string, name: string, count: number) => {
        if (count > 0) {
            alert(`Cannot delete "${name}" — it has ${count} product(s). Reassign products first.`);
            return;
        }
        if (!confirm(`Delete category "${name}"?`)) return;
        await supabase.from('categories').delete().eq('id', id);
        setCategories(cs => cs.filter(c => c.id !== id));
    };

    return (
        <div className="container section">
            <Link href="/admin" className={styles.back}>
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>

            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Categories</h1>
                    <p className={styles.count}>{categories.length} categories · {categories.reduce((s, c) => s + (c.product_count ?? 0), 0)} total products</p>
                </div>
                <button className="btn" onClick={() => { setAdding(true); setError(''); }}>
                    <Plus size={15} /> Add Category
                </button>
            </div>

            {/* Add form */}
            {adding && (
                <div className={styles.addForm}>
                    <h3 className={styles.addTitle}>New Category</h3>
                    <form onSubmit={handleAdd} className={styles.formRow}>
                        <div className={styles.formField}>
                            <label>Slug / ID</label>
                            <input
                                placeholder="e.g. stage-decor"
                                value={form.id}
                                onChange={e => setForm({ ...form, id: e.target.value })}
                                required
                            />
                            <span className={styles.hint}>Lowercase, hyphens only. Auto-formatted on save.</span>
                        </div>
                        <div className={styles.formField}>
                            <label>Display Name</label>
                            <input
                                placeholder="e.g. Stage Decor"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formActions}>
                            {error && <p className={styles.formError}>{error}</p>}
                            <button type="submit" className="btn" disabled={saving}>
                                {saving ? 'Saving…' : 'Save'}
                            </button>
                            <button type="button" className="btn ghost" onClick={() => { setAdding(false); setError(''); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <Search size={14} />
                    <input
                        className={styles.searchInput}
                        placeholder="Search categories…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.sortBtns}>
                    {(['name', 'product_count', 'created_at'] as SortKey[]).map(k => (
                        <button key={k} className={`${styles.sortBtn} ${sort === k ? styles.sortActive : ''}`} onClick={() => toggleSort(k)}>
                            {{ name: 'Name', product_count: 'Products', created_at: 'Date Added' }[k]}{arrow(k)}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', fontSize: 12 }}>Loading…</p>
            ) : filtered.length === 0 ? (
                <div className={styles.empty}>
                    <Tag size={32} style={{ color: 'var(--line)', marginBottom: 12 }} />
                    <p>{search ? 'No categories match your search.' : 'No categories yet. Add your first one above.'}</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filtered.map(cat => (
                        <div key={cat.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <div>
                                    <div className={styles.catName}>{cat.name}</div>
                                    <div className={styles.catSlug}>{cat.id}</div>
                                </div>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(cat.id, cat.name, cat.product_count ?? 0)}
                                    title="Delete category"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                            <div className={styles.cardFoot}>
                                <span className={styles.prodCount}>
                                    {cat.product_count ?? 0} product{(cat.product_count ?? 0) !== 1 ? 's' : ''}
                                </span>
                                <Link href={`/catalog?category=${cat.id}`} className={styles.viewLink} target="_blank">
                                    View in catalog →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
