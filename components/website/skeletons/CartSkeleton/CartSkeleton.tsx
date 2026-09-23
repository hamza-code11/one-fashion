// components/website/skeletons/CartSkeleton/CartSkeleton.tsx
import React from 'react';
import styles from './CartSkeleton.module.css';

export default function CartSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={`${styles.shimmer} ${styles.title}`} />
          <span className={`${styles.shimmer} ${styles.subtitle}`} />
        </div>

        <div className={styles.layout}>
          {/* ITEMS */}
          <div className={styles.items}>
            {[1, 2, 3].map((i) => (
              <article key={i} className={styles.item}>
                {/* IMAGE */}
                <div className={`${styles.shimmer} ${styles.imageBox}`} />

                <div className={styles.details}>
                  {/* INFO COLUMN */}
                  <div className={styles.infoCol}>
                    <span className={`${styles.shimmer} ${styles.lineXs}`} />
                    <span className={`${styles.shimmer} ${styles.lineMd}`} />
                    <span className={`${styles.shimmer} ${styles.lineSm}`} />

                    {/* Color swatches */}
                    <div className={styles.variantBlock}>
                      <span className={`${styles.shimmer} ${styles.lineXs}`} />
                      <div className={styles.colorRow}>
                        {[1, 2, 3].map((c) => (
                          <span
                            key={c}
                            className={`${styles.shimmer} ${styles.colorSwatch}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size boxes */}
                    <div className={styles.variantBlock}>
                      <span className={`${styles.shimmer} ${styles.lineXs}`} />
                      <div className={styles.sizeRow}>
                        {[1, 2, 3, 4].map((s) => (
                          <span
                            key={s}
                            className={`${styles.shimmer} ${styles.sizeBox}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTION COLUMN */}
                  <div className={styles.actionCol}>
                    <span className={`${styles.shimmer} ${styles.stepper}`} />
                    <span className={`${styles.shimmer} ${styles.lineTotal}`} />
                    <span className={`${styles.shimmer} ${styles.removeBtn}`} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* SUMMARY */}
          <aside className={styles.summary}>
            <span className={`${styles.shimmer} ${styles.summaryTitle}`} />

            <div className={styles.summaryRow}>
              <span className={`${styles.shimmer} ${styles.lineSm}`} />
              <span className={`${styles.shimmer} ${styles.lineSm}`} />
            </div>

            <div className={styles.summaryRow}>
              <span className={`${styles.shimmer} ${styles.lineSm}`} />
              <span className={`${styles.shimmer} ${styles.lineSm}`} />
            </div>

            <span className={`${styles.shimmer} ${styles.checkoutBtn}`} />
            <span className={`${styles.shimmer} ${styles.continueLink}`} />
          </aside>
        </div>
      </div>
    </div>
  );
}
