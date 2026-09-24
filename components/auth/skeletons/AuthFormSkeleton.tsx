// components/auth/skeletons/AuthFormSkeleton.tsx
import React from 'react';
import styles from './AuthFormSkeleton.module.css';

interface AuthFormSkeletonProps {
  fields?: number;
  hasGrid?: boolean; // two-column layout for first row (register: first/last name)
  hasCheckbox?: boolean;
  hasForgot?: boolean; // login: "Forgot?" link next to password
}

export default function AuthFormSkeleton({
  fields = 2,
  hasGrid = false,
  hasCheckbox = false,
  hasForgot = false,
}: AuthFormSkeletonProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* BRAND */}
        <div className={styles.brandRow}>
          <span className={`${styles.shimmer} ${styles.brand}`} />
        </div>

        {/* HEADER */}
        <div className={styles.header}>
          <span className={`${styles.shimmer} ${styles.title}`} />
          <span className={`${styles.shimmer} ${styles.subtitle}`} />
        </div>

        {/* FORM */}
        <div className={styles.form}>
          {hasGrid ? (
            <>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <span className={`${styles.shimmer} ${styles.label}`} />
                  <span className={`${styles.shimmer} ${styles.input}`} />
                </div>
                <div className={styles.field}>
                  <span className={`${styles.shimmer} ${styles.label}`} />
                  <span className={`${styles.shimmer} ${styles.input}`} />
                </div>
              </div>

              {/* remaining fields */}
              {Array.from({ length: fields - 2 }).map((_, i) => (
                <div key={i} className={styles.field}>
                  <span className={`${styles.shimmer} ${styles.label}`} />
                  <span className={`${styles.shimmer} ${styles.input}`} />
                </div>
              ))}
            </>
          ) : (
            Array.from({ length: fields }).map((_, i) => (
              <div key={i} className={styles.field}>
                <div className={styles.labelRow}>
                  <span className={`${styles.shimmer} ${styles.label}`} />
                  {hasForgot && i === 1 && (
                    <span className={`${styles.shimmer} ${styles.forgot}`} />
                  )}
                </div>
                <span className={`${styles.shimmer} ${styles.input}`} />
              </div>
            ))
          )}

          {/* CHECKBOX */}
          {hasCheckbox && (
            <div className={styles.checkboxRow}>
              <span className={`${styles.shimmer} ${styles.checkbox}`} />
              <span className={`${styles.shimmer} ${styles.checkboxLabel}`} />
            </div>
          )}

          {/* SUBMIT */}
          <span className={`${styles.shimmer} ${styles.submit}`} />
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <span className={`${styles.shimmer} ${styles.footerLine}`} />
        </div>
      </div>
    </div>
  );
}

