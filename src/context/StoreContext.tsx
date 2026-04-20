"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/lib/data';

interface StoreContextType {
    products: Product[];
    categories: Category[];
    loading: boolean;
    addProduct: (product: Omit<Product, 'id' | 'views' | 'likes' | 'created_at'>, imageFiles: File[], videoFile?: File) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    refreshProducts: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, images:product_images(*)')
            .order('created_at', { ascending: false });

        if (!error && data) setProducts(data as Product[]);
    }, []);

    const fetchCategories = useCallback(async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (!error && data) setCategories(data as Category[]);
    }, []);

    useEffect(() => {
        Promise.all([fetchProducts(), fetchCategories()]).finally(() => setLoading(false));
    }, [fetchProducts, fetchCategories]);

    const uploadFile = async (file: File, bucket: string): Promise<string> => {
        const ext = file.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
    };

    const addProduct = async (
        product: Omit<Product, 'id' | 'views' | 'likes' | 'created_at'>,
        imageFiles: File[],
        videoFile?: File
    ) => {
        let videoUrl: string | undefined;
        if (videoFile) videoUrl = await uploadFile(videoFile, 'product-videos');

        const { data, error } = await supabase
            .from('products')
            .insert({ ...product, video_url: videoUrl, views: 0, likes: 0 })
            .select()
            .single();

        if (error) throw error;

        if (imageFiles.length > 0) {
            const imageInserts = await Promise.all(
                imageFiles.map(async (file, i) => {
                    const url = await uploadFile(file, 'product-images');
                    return { product_id: data.id, url, is_primary: i === 0, display_order: i };
                })
            );
            await supabase.from('product_images').insert(imageInserts);
        }

        await fetchProducts();
    };

    const deleteProduct = async (id: string) => {
        await supabase.from('products').delete().eq('id', id);
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        const { error } = await supabase.from('products').update(updates).eq('id', id);
        if (!error) setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    return (
        <StoreContext.Provider value={{
            products, categories, loading,
            addProduct, deleteProduct, updateProduct,
            refreshProducts: fetchProducts,
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) throw new Error('useStore must be used within a StoreProvider');
    return context;
}
