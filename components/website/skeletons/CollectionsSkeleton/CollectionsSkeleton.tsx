// components/website/skeletons/CollectionsSkeleton/CollectionsSkeleton.tsx
import React from 'react';
import styles from './CollectionsSkeleton.module.css';

export default function CollectionsSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={`${styles.shimmer} ${styles.eyebrow}`} />
          <span className={`${styles.shimmer} ${styles.title}`} />
          <span className={`${styles.shimmer} ${styles.description}`} />
          <span className={`${styles.shimmer} ${styles.descriptionShort}`} />
        </header>

        {/* BENTO GRID */}
        <div className={styles.bento}>
          {/* A — big feature 2×2 */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile1}`} />

          {/* B — square */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile2}`} />

          {/* C — square */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile3}`} />

          {/* D — wide 2×1 */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile4}`} />

          {/* E — tall 1×2 */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile5}`} />

          {/* F — square */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile6}`} />

          {/* G — square */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile7}`} />

          {/* H — full-width strip */}
          <div className={`${styles.shimmer} ${styles.tile} ${styles.tile8}`} />
        </div>
      </div>
    </div>
  );
}
