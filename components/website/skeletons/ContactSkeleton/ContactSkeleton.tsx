// components/website/skeletons/ContactSkeleton/ContactSkeleton.tsx
import React from 'react';
import styles from './ContactSkeleton.module.css';

export default function ContactSkeleton() {
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

        {/* LAYOUT */}
        <div className={styles.layout}>
          {/* LEFT — INFO CARDS */}
          <aside className={styles.infoCol}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.infoCard}>
                <span className={`${styles.shimmer} ${styles.infoIcon}`} />
                <div className={styles.infoText}>
                  <span className={`${styles.shimmer} ${styles.infoTitle}`} />
                  <span className={`${styles.shimmer} ${styles.infoValue}`} />
                  <span className={`${styles.shimmer} ${styles.infoNote}`} />
                </div>
              </div>
            ))}
          </aside>

          {/* RIGHT — FORM */}
          <div className={styles.formCol}>
            <div className={styles.form}>
              {/* NAME */}
              <div className={styles.field}>
                <span className={`${styles.shimmer} ${styles.label}`} />
                <span className={`${styles.shimmer} ${styles.input}`} />
              </div>

              {/* EMAIL */}
              <div className={styles.field}>
                <span className={`${styles.shimmer} ${styles.label}`} />
                <span className={`${styles.shimmer} ${styles.input}`} />
              </div>

              {/* PHONE */}
              <div className={styles.field}>
                <span className={`${styles.shimmer} ${styles.label}`} />
                <span className={`${styles.shimmer} ${styles.input}`} />
              </div>

              {/* MESSAGE */}
              <div className={styles.field}>
                <span className={`${styles.shimmer} ${styles.label}`} />
                <span className={`${styles.shimmer} ${styles.textarea}`} />
              </div>

              {/* SUBMIT */}
              <span className={`${styles.shimmer} ${styles.submitBtn}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
