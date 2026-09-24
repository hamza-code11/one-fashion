// components/website/skeletons/CollectionProductsSkeleton/CollectionProductsSkeleton.tsx
import React from 'react';
import ProductCardSkeleton from '../ProductCardSkeleton/ProductCardSkeleton';
import styles from './CollectionProductsSkeleton.module.css';

export default function CollectionProductsSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          {/* breadcrumb */}
          <div className={styles.breadcrumb}>
            <span className={`${styles.shimmer} ${styles.crumb}`} />
            <span className={`${styles.shimmer} ${styles.crumbDot}`} />
            <span className={`${styles.shimmer} ${styles.crumb}`} />
            <span className={`${styles.shimmer} ${styles.crumbDot}`} />
            <span className={`${styles.shimmer} ${styles.crumbLg}`} />
          </div>

          {/* title */}
          <span className={`${styles.shimmer} ${styles.title}`} />
          {/* subtitle */}
          <span className={`${styles.shimmer} ${styles.subtitle}`} />
          {/* description — 2 lines */}
          <span className={`${styles.shimmer} ${styles.description}`} />
          <span className={`${styles.shimmer} ${styles.descriptionShort}`} />
        </header>

        {/* TOOLBAR */}
        <div className={styles.toolbar}>
          <span className={`${styles.shimmer} ${styles.count}`} />
          <div className={styles.filters}>
            <span className={`${styles.shimmer} ${styles.select}`} />
            <span className={`${styles.shimmer} ${styles.select}`} />
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className={styles.grid}>
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

