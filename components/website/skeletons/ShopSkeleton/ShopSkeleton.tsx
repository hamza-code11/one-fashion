// components/website/skeletons/ShopSkeleton/ShopSkeleton.tsx
import ProductCardSkeleton from '@/components/website/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import styles from './ShopSkeleton.module.css';

// 5 columns desktop par 2 poori rows
const SKELETON_COUNT = 10;

export default function ShopSkeleton() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Loading products">
      <div className={styles.container}>
        {/* SHOP HEADER */}
        <div className={styles.header}>
          <span className={`${styles.shimmer} ${styles.headerTitle}`} />
          <span className={`${styles.shimmer} ${styles.headerSubtitle}`} />
        </div>

        <div className={styles.layout}>
          {/* SIDEBAR (desktop only) */}
          <aside className={styles.sidebar}>
            {[1, 2, 3].map((block) => (
              <div key={block} className={styles.filterBlock}>
                <span className={`${styles.shimmer} ${styles.filterTitle}`} />
                {[1, 2, 3, 4].map((row) => (
                  <div key={row} className={styles.filterRow}>
                    <span className={`${styles.shimmer} ${styles.checkbox}`} />
                    <span className={`${styles.shimmer} ${styles.filterLabel}`} />
                  </div>
                ))}
              </div>
            ))}
          </aside>

          {/* CONTENT */}
          <div className={styles.content}>
            {/* TOOLBAR */}
            <div className={styles.toolbar}>
              <span className={`${styles.shimmer} ${styles.toolbarCount}`} />
              <span className={`${styles.shimmer} ${styles.toolbarSort}`} />
            </div>

            {/* PRODUCT GRID */}
            <div className={styles.grid}>
              {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
