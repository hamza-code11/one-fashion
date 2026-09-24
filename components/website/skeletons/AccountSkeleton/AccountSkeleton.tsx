// components/website/skeletons/AccountSkeleton/AccountSkeleton.tsx
import React from 'react';
import styles from './AccountSkeleton.module.css';

export default function AccountSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* PAGE TITLE */}
        <span className={`${styles.shimmer} ${styles.title}`} />

        <div className={styles.layout}>
          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            {/* USER CARD */}
            <div className={styles.userCard}>
              <span className={`${styles.shimmer} ${styles.avatar}`} />
              <div className={styles.userInfo}>
                <span className={`${styles.shimmer} ${styles.userName}`} />
                <span className={`${styles.shimmer} ${styles.userEmail}`} />
              </div>
            </div>

            {/* TABS */}
            <nav className={styles.tabs}>
              <span className={`${styles.shimmer} ${styles.tab} ${styles.tabActive}`} />
              <span className={`${styles.shimmer} ${styles.tab}`} />
              <span className={`${styles.shimmer} ${styles.tab} ${styles.logoutBtn}`} />
            </nav>
          </aside>

          {/* CONTENT */}
          <div className={styles.content}>
            {/* SECTION HEADING */}
            <span className={`${styles.shimmer} ${styles.sectionHeading}`} />

            {/* FORM GRID */}
            <div className={styles.grid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.field}>
                  <span className={`${styles.shimmer} ${styles.label}`} />
                  <span className={`${styles.shimmer} ${styles.input}`} />
                </div>
              ))}
            </div>

            {/* SAVE BUTTON */}
            <span className={`${styles.shimmer} ${styles.saveBtn}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

