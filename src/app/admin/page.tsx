"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';
import { Plus, Trash2, Download, Save, X, LayoutGrid, MessageSquare, BarChart2, ImageIcon, Video, LogOut } from 'lucide-react';
import styles from './admin.module.css';

interface NewProductForm {
    name: string;
    description: string;
    price: number;
    category_id: string;
    in_stock: boolean;
}

export default function AdminPage() {
    const router = useRouter();
    const { products, categories, loading, addProduct, deleteProduct, updateProduct } = useStore();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [videoFile, setVideoFile] = useState<File | undefined>();
    const [form, setForm] = useState<NewProductForm>({
        name: '',
        description: '',
        price: 0,
        category_id: 'stage-decor',
        in_stock: true,
    });

    const handleExport = () => {
        const rows = products.map(p => ({
            ID: p.id,
            Name: p.name,
            Category: categories.find(c => c.id === p.category_id)?.name ?? p.category_id,
            Price: p.price,
            'In Stock': p.in_stock ? 'Yes' : 'No',
            Views: p.views,
            Likes: p.likes,
        }));
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
        XLSX.writeFile(wb, 'shaadi_collection_inventory.xlsx');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.price) return;
        setSaving(true);
        try {
            await addProduct(form, imageFiles, videoFile);
            setIsAdding(false);
            setForm({ name: '', description: '', price: 0, category_id: 'stage-decor', in_stock: true });
            setImageFiles([]);
            setVideoFile(undefined);
        } finally {
            setSaving(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setImageFiles(Array.from(e.target.files));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setVideoFile(e.target.files[0]);
    };

    if (loading) return <div className="container section">Loading...</div>;

    return (
        <div className="container section">
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <div className={styles.actions}>
                    <button className="btn ghost" onClick={handleExport}>
                        <Download size={16} /> Export
                    </button>
                    <button className="btn" onClick={() => setIsAdding(true)}>
                        <Plus size={16} /> Add Product
                    </button>
                    <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            {/* Sub-page nav */}
            <div className={styles.subNav}>
                <Link href="/admin/categories" className={styles.subNavLink}>
                    <LayoutGrid size={18} /> Categories
                </Link>
                <Link href="/admin/inquiries" className={styles.subNavLink}>
                    <MessageSquare size={18} /> Inquiries
                </Link>
                <Link href="/admin/analytics" className={styles.subNavLink}>
                    <BarChart2 size={18} /> Analytics
                </Link>
            </div>

            {/* Add Product Modal */}
            {isAdding && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>Add New Product</h2>
                            <button onClick={() => setIsAdding(false)} className={styles.closeBtn}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Category</label>
                                <select
                                    value={form.category_id}
                                    onChange={e => setForm({ ...form, category_id: e.target.value })}
                                >
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    min={0}
                                    value={form.price}
                                    onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label><ImageIcon size={15} style={{ marginRight: 6 }} />Product Images</label>
                                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                                {imageFiles.length > 0 && (
                                    <p className={styles.fileHint}>{imageFiles.length} image(s) selected</p>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label><Video size={15} style={{ marginRight: 6 }} />Product Video (optional)</label>
                                <input type="file" accept="video/*" onChange={handleVideoChange} />
                                {videoFile && <p className={styles.fileHint}>{videoFile.name}</p>}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.checkLabel}>
                                    <input
                                        type="checkbox"
                                        checked={form.in_stock}
                                        onChange={e => setForm({ ...form, in_stock: e.target.checked })}
                                    /> In Stock
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={saving}>
                                <Save size={18} /> {saving ? 'Saving...' : 'Save Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Inventory Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const primaryImage = product.images?.find(i => i.is_primary) ?? product.images?.[0];
                            const categoryName = categories.find(c => c.id === product.category_id)?.name ?? product.category_id;
                            return (
                                <tr key={product.id}>
                                    <td>
                                        {primaryImage ? (
                                            <img src={primaryImage.url} alt={product.name} className={styles.thumb} />
                                        ) : (
                                            <div className={styles.thumbPlaceholder}><ImageIcon size={20} /></div>
                                        )}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{categoryName}</td>
                                    <td>₹{product.price.toLocaleString('en-IN')}</td>
                                    <td>
                                        <button
                                            className={product.in_stock ? styles.stockIn : styles.stockOut}
                                            onClick={() => updateProduct(product.id, { in_stock: !product.in_stock })}
                                            title="Click to toggle stock status"
                                        >
                                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => {
                                                if (confirm('Delete this product?')) deleteProduct(product.id);
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-secondary)' }}>
                        No products yet. Add your first product above.
                    </p>
                )}
            </div>
        </div>
    );
}
