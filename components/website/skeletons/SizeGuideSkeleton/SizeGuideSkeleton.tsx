// components/website/skeletons/SizeGuideSkeleton/SizeGuideSkeleton.tsx
import React from 'react';
import styles from './SizeGuideSkeleton.module.css';

export default function SizeGuideSkeleton() {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={`${styles.shimmer} ${styles.eyebrow}`} />
          <span className={`${styles.shimmer} ${styles.title}`} />
          <span className={`${styles.shimmer} ${styles.description}`} />
          <span className={`${styles.shimmer} ${styles.descriptionShort}`} />
        </div>

        {/* GUIDE CARDS */}
        <div className={styles.guideGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.guideCard}>
              <span className={`${styles.shimmer} ${styles.guideIcon}`} />
              <span className={`${styles.shimmer} ${styles.guideTitle}`} />
              <span className={`${styles.shimmer} ${styles.guideLine}`} />
              <span className={`${styles.shimmer} ${styles.guideLineShort}`} />
            </div>
          ))}
        </div>

        {/* CHART HEADING */}
        <span className={`${styles.shimmer} ${styles.chartHeading}`} />

        {/* TABLE */}
        <div className={styles.tableWrapper}>
          {/* HEADER ROW */}
          <div className={styles.tableRowHead}>
            <span className={`${styles.shimmer} ${styles.cellHead}`} />
            <span className={`${styles.shimmer} ${styles.cellHead}`} />
            <span className={`${styles.shimmer} ${styles.cellHead}`} />
            <span className={`${styles.shimmer} ${styles.cellHead}`} />
          </div>

          {/* BODY ROWS */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.tableRow}>
              <span className={`${styles.shimmer} ${styles.cell}`} />
              <span className={`${styles.shimmer} ${styles.cell}`} />
              <span className={`${styles.shimmer} ${styles.cell}`} />
              <span className={`${styles.shimmer} ${styles.cell}`} />
            </div>
          ))}
        </div>

        {/* FOOTNOTE */}
        <span className={`${styles.shimmer} ${styles.footnote}`} />
      </div>
    </section>
  );
}
