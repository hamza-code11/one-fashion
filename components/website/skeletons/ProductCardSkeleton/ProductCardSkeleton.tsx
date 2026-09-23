// components/commen/ProductCard/ProductCardSkeleton.tsx
import React from 'react';
import styles from './ProductCardSkeleton.module.css';

export default function ProductCardSkeleton() {
  return (
    <article className={styles.card}>
      {/* IMAGE */}
      <div className={styles.imageWrap}>
        <div className={`${styles.shimmer} ${styles.image}`} />

        {/* BADGE */}
        <span className={`${styles.shimmer} ${styles.badge}`} />

        {/* WISHLIST */}
        <span className={`${styles.shimmer} ${styles.wishlistBtn}`} />
      </div>

      {/* INFO */}
      <div className={styles.info}>
        {/* meta line */}
        <div className={styles.meta}>
          <span className={`${styles.shimmer} ${styles.rating}`} />
          <span className={`${styles.shimmer} ${styles.dot}`} />
          <span className={`${styles.shimmer} ${styles.category}`} />
        </div>

        {/* name */}
        <span className={`${styles.shimmer} ${styles.name}`} />

        {/* price row */}
        <div className={styles.priceRow}>
          <span className={`${styles.shimmer} ${styles.price}`} />
          <span className={`${styles.shimmer} ${styles.oldPrice}`} />
        </div>
      </div>
    </article>
  );
}

