// types/Product.ts — updated with slug

export interface ProductColor {
  name: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  gender: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: 'NEW' | 'SALE' | 'HOT';
  brand?: string;
  images?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  description?: string;
}
