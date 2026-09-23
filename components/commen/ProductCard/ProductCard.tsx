'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/types/Product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  const wishlisted = has(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product); 
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1); // ← util now picks first color + first size automatically
  };

  return (
    <article className={styles.card}>
      {/* ...unchanged JSX... */}
      <div className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={styles.image}
        />

        {product.badge && (
          <span
            className={`${styles.badge} ${
              product.badge === 'NEW'
                ? styles.badgeNew
                : product.badge === 'SALE'
                ? styles.badgeSale
                : styles.badgeHot
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className={`${styles.wishlistBtn} ${
            wishlisted ? styles.wishlistActive : ''
          }`}
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        <button
          type="button"
          className={styles.quickAdd}
          onClick={handleAddToCart}
          aria-label="Quick add to cart"
        >
          <Plus size={18} strokeWidth={2.2} />
          <span>Quick Add</span>
        </button>
      </div>

      <Link href={`/product/${product.id}`} className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.category}>{product.category}</span>
        </div>

        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>
            PKR {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className={styles.oldPrice}>
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;