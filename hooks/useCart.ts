// hooks/useCart.ts
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import {
  addToCart as addToCartUtil,
  getCart,
  CartItem,
  removeFromCart as removeFromCartUtil,
  saveCart,
} from '@/utils/cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CartItem[]>).detail;
      setCart(detail);
    };
    window.addEventListener('cart:updated', handler);
    return () => window.removeEventListener('cart:updated', handler);
  }, []);

  const addItem = (
    product: Product,
    quantity: number = 1,
    options?: { color?: string; size?: string }
  ) => {
    const next = addToCartUtil(product, quantity, options);
    setCart(next);
  };

  const removeItem = (
    productId: number,
    options?: { color?: string; size?: string }
  ) => {
    const next = removeFromCartUtil(productId, options);
    setCart(next);
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    options?: { color?: string; size?: string }
  ) => {
    if (quantity < 1) return;

    const next = cart.map((item) => {
      if (
        item.product.id === productId &&
        item.color === options?.color &&
        item.size === options?.size
      ) {
        return { ...item, quantity };
      }
      return item;
    });

    saveCart(next);
    setCart(next);
  };

  /** Update color / size of an existing cart line item */
  const updateVariant = (
    productId: number,
    current: { color?: string; size?: string },
    next: { color?: string; size?: string }
  ) => {
    const updated = cart.map((item) => {
      const matches =
        item.product.id === productId &&
        item.color === current.color &&
        item.size === current.size;

      if (!matches) return item;
      return { ...item, color: next.color, size: next.size };
    });

    // merge duplicates (same product + same new variant already exists)
    const merged: CartItem[] = [];
    updated.forEach((line) => {
      const dup = merged.find(
        (m) =>
          m.product.id === line.product.id &&
          m.color === line.color &&
          m.size === line.size
      );
      if (dup) {
        dup.quantity += line.quantity;
      } else {
        merged.push({ ...line });
      }
    });

    saveCart(merged);
    setCart(merged);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    updateVariant,
    totalItems,
    totalPrice,
  };
}
