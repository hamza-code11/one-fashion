// components/website/skeletons/WishlistSkeleton/WishlistSkeleton.tsx
import ProductCardSkeleton from '@/components/website/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import styles from './WishlistSkeleton.module.css';

// Wishlist page grid: 5 columns on desktop
const SKELETON_COUNT = 10;

export default function WishlistSkeleton() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Loading wishlist">
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={`${styles.shimmer} ${styles.title}`} />
            <span className={`${styles.shimmer} ${styles.subtitle}`} />
          </div>
          <span className={`${styles.shimmer} ${styles.clearBtn}`} />
        </div>

        {/* GRID — each cell wraps ProductCardSkeleton + wishlist-specific overlays */}
        <div className={styles.grid}>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div key={index} className={styles.cardWrapper}>
              {/* base skeleton: image + meta + name + price */}
              <ProductCardSkeleton />

              {/* top-right remove button — wishlist only */}
              <span className={`${styles.shimmer} ${styles.removeBtn}`} />

              {/* variant chips — wishlist only */}
              <div className={styles.variantsRow}>
                <span className={`${styles.shimmer} ${styles.variantChip}`} />
                <span className={`${styles.shimmer} ${styles.variantChip}`} />
              </div>

              {/* move-to-cart button — wishlist only */}
              <span className={`${styles.shimmer} ${styles.moveBtn}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
