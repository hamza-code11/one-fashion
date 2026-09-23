// components/website/about/AboutSkeleton.tsx
import React from 'react';
import styles from './AboutSkeleton.module.css';

export default function AboutSkeleton() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={`${styles.shimmer} ${styles.lineSm}`} />
          <span className={`${styles.shimmer} ${styles.heroTitle}`} />
          <span className={`${styles.shimmer} ${styles.lineMd}`} />
        </div>
      </section>

      {/* STORY */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={`${styles.shimmer} ${styles.imageBox}`} />

            <div className={styles.textCol}>
              <span className={`${styles.shimmer} ${styles.lineXs}`} />
              <span className={`${styles.shimmer} ${styles.heading}`} />
              <span className={`${styles.shimmer} ${styles.line}`} />
              <span className={`${styles.shimmer} ${styles.line}`} />
              <span className={`${styles.shimmer} ${styles.lineShort}`} />
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className={`${styles.section} ${styles.cream}`}>
        <div className={styles.container}>
          <div className={styles.headerCol}>
            <span className={`${styles.shimmer} ${styles.lineXs}`} />
            <span className={`${styles.shimmer} ${styles.heading}`} />
            <span className={`${styles.shimmer} ${styles.line}`} />
            <span className={`${styles.shimmer} ${styles.lineShort}`} />
          </div>

          <div className={styles.valuesGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.valueCard}>
                <span className={`${styles.shimmer} ${styles.lineTop}`} />
                <span className={`${styles.shimmer} ${styles.lineSm}`} />
                <span className={`${styles.shimmer} ${styles.line}`} />
                <span className={`${styles.shimmer} ${styles.lineShort}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.qualityGrid}>
            <div className={styles.qualityLeft}>
              <span className={`${styles.shimmer} ${styles.lineXs}`} />
              <span className={`${styles.shimmer} ${styles.heading}`} />
              <span className={`${styles.shimmer} ${styles.line}`} />
              <span className={`${styles.shimmer} ${styles.line}`} />
              <span className={`${styles.shimmer} ${styles.lineShort}`} />

              <div className={styles.statsGrid}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={`${styles.shimmer} ${styles.statValue}`} />
                    <span className={`${styles.shimmer} ${styles.statLabel}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.shimmer} ${styles.imageBox}`} />
          </div>
        </div>
      </section>
    </div>
  );
}

