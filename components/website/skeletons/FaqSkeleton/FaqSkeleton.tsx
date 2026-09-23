// components/website/skeletons/FaqSkeleton/FaqSkeleton.tsx
import React from 'react';
import styles from './FaqSkeleton.module.css';

export default function FaqSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={`${styles.shimmer} ${styles.eyebrow}`} />
          <span className={`${styles.shimmer} ${styles.heading}`} />
          <span className={`${styles.shimmer} ${styles.description}`} />
          <span className={`${styles.shimmer} ${styles.descriptionShort}`} />
        </header>

        {/* ACCORDION */}
        <div className={styles.list}>
          {/* first item — open state with answer visible */}
          <div className={`${styles.item} ${styles.itemOpen}`}>
            <div className={styles.question}>
              <span className={`${styles.shimmer} ${styles.questionText}`} />
              <span className={`${styles.shimmer} ${styles.icon} ${styles.iconOpen}`} />
            </div>
            <div className={styles.answerWrap}>
              <div className={styles.answer}>
                <span className={`${styles.shimmer} ${styles.answerLine}`} />
                <span className={`${styles.shimmer} ${styles.answerLine}`} />
                <span className={`${styles.shimmer} ${styles.answerLineShort}`} />
              </div>
            </div>
          </div>

          {/* remaining items — closed state */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className={styles.item}>
              <div className={styles.question}>
                <span className={`${styles.shimmer} ${styles.questionText}`} />
                <span className={`${styles.shimmer} ${styles.icon}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}