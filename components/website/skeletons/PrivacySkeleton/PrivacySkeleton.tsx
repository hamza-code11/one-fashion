// components/website/skeletons/PrivacySkeleton/PrivacySkeleton.tsx
import React from 'react';
import styles from './PrivacySkeleton.module.css';

export default function PrivacySkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={`${styles.shimmer} ${styles.eyebrow}`} />
          <span className={`${styles.shimmer} ${styles.heading}`} />
          <span className={`${styles.shimmer} ${styles.lastUpdated}`} />
          <span className={`${styles.shimmer} ${styles.intro}`} />
          <span className={`${styles.shimmer} ${styles.introShort}`} />
        </header>

        {/* BODY — sidebar + content */}
        <div className={styles.layout}>
          {/* LEFT — TOC sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.toc}>
              <span className={`${styles.shimmer} ${styles.tocTitle}`} />
              <div className={styles.tocList}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <span
                    key={i}
                    className={`${styles.shimmer} ${styles.tocLink}`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT — content sections */}
          <div className={styles.content}>
            <div className={styles.sections}>
              {/* First section — with bullets */}
              <section className={styles.section}>
                <span className={`${styles.shimmer} ${styles.sectionHeading}`} />
                <span className={`${styles.shimmer} ${styles.paragraph}`} />
                <span className={`${styles.shimmer} ${styles.paragraph}`} />
                <span className={`${styles.shimmer} ${styles.paragraphShort}`} />

                <div className={styles.bullets}>
                  {[1, 2, 3, 4].map((b) => (
                    <span
                      key={b}
                      className={`${styles.shimmer} ${styles.bullet}`}
                    />
                  ))}
                </div>
              </section>

              {/* Second section — paragraphs only */}
              <section className={styles.section}>
                <span className={`${styles.shimmer} ${styles.sectionHeading}`} />
                <span className={`${styles.shimmer} ${styles.paragraph}`} />
                <span className={`${styles.shimmer} ${styles.paragraphShort}`} />
              </section>

              {/* Third section — with bullets */}
              <section className={styles.section}>
                <span className={`${styles.shimmer} ${styles.sectionHeading}`} />
                <span className={`${styles.shimmer} ${styles.paragraph}`} />

                <div className={styles.bullets}>
                  {[1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className={`${styles.shimmer} ${styles.bullet}`}
                    />
                  ))}
                </div>
              </section>

              {/* Fourth section — paragraphs only */}
              <section className={styles.section}>
                <span className={`${styles.shimmer} ${styles.sectionHeading}`} />
                <span className={`${styles.shimmer} ${styles.paragraph}`} />
                <span className={`${styles.shimmer} ${styles.paragraph}`} />
                <span className={`${styles.shimmer} ${styles.paragraphShort}`} />
              </section>
            </div>

            {/* FOOTER CTA */}
            <div className={styles.footerCard}>
              <span className={`${styles.shimmer} ${styles.footerText}`} />
              <span className={`${styles.shimmer} ${styles.footerBtn}`} />
              <span className={`${styles.shimmer} ${styles.footerEmail}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
