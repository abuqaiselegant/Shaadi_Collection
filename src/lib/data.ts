export interface ProductImage {
    id: string;
    product_id: string;
    url: string;
    is_primary: boolean;
    display_order: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    in_stock: boolean;
    video_url?: string;
    views: number;
    likes: number;
    created_at?: string;
    images?: ProductImage[];
}

export interface Category {
    id: string;
    name: string;
    image?: string;
}

// Legacy seed data — kept for reference only, data now lives in Supabase
export const categories: Category[] = [
    { id: 'stage-decor', name: 'Stage Decor', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop' },
    { id: 'table-settings', name: 'Table Settings', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop' },
    { id: 'lighting', name: 'Lighting', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop' },
    { id: 'gifts', name: 'Gifts & Favors', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop' },
    { id: 'utility', name: 'Utility Items', image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=800&auto=format&fit=crop' },
];
