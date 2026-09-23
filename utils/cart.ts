// utils/cart.ts
'use client';

import { Product } from '@/types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface WishlistItem {
  product: Product;   // ← full product
  color?: string;
  size?: string;
}

const CART_KEY = 'oneplusone_cart';
const WISHLIST_KEY = 'oneplusone_wishlist';

/* ---------- CART ---------- */

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

export function addToCart(
  product: Product,
  quantity: number = 1,
  options?: { color?: string; size?: string }
) {
  const cart = getCart();

  const color = options?.color ?? product.colors?.[0]?.name;
  const size = options?.size ?? product.sizes?.[0];

  const existingIndex = cart.findIndex(
    (item) =>
      item.product.id === product.id &&
      item.color === color &&
      item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity, color, size });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(
  productId: number,
  options?: { color?: string; size?: string }
) {
  const cart = getCart().filter(
    (item) =>
      !(
        item.product.id === productId &&
        item.color === options?.color &&
        item.size === options?.size
      )
  );
  saveCart(cart);
  return cart;
}

/* ---------- WISHLIST ---------- */

export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: items }));
}

export function toggleWishlist(
  product: Product,
  options?: { color?: string; size?: string }
): WishlistItem[] {
  const current = getWishlist();
  const exists = current.some((item) => item.product.id === product.id);

  let next: WishlistItem[];

  if (exists) {
    next = current.filter((item) => item.product.id !== product.id);
  } else {
    const color = options?.color ?? product.colors?.[0]?.name;
    const size = options?.size ?? product.sizes?.[0];
    next = [...current, { product, color, size }];
  }

  saveWishlist(next);
  return next;
}

export function clearWishlist() {
  saveWishlist([]);
}


