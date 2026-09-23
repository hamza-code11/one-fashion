// hooks/useWishlist.ts
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import {
  getWishlist,
  toggleWishlist as toggleWishlistUtil,
  clearWishlist as clearWishlistUtil,
  WishlistItem,
} from '@/utils/cart';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<WishlistItem[]>).detail;
      setWishlist(detail);
    };
    window.addEventListener('wishlist:updated', handler);
    return () => window.removeEventListener('wishlist:updated', handler);
  }, []);

  const toggle = (
    product: Product,
    options?: { color?: string; size?: string }
  ) => {
    const next = toggleWishlistUtil(product, options);
    setWishlist(next);
  };

  const clearWishlist = () => {
    clearWishlistUtil();
    setWishlist([]);
  };

  const has = (productId: number) =>
    wishlist.some((item) => item.product.id === productId);

  return { wishlist, toggle, has, clearWishlist };
}
