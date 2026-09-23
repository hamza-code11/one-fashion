// components/website/skeletons/ProductSkeleton/ProductSkeleton.tsx
import React from 'react';
import styles from './ProductSkeleton.module.css';

export default function ProductSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* TOP — gallery + info */}
        <div className={styles.top}>
          {/* GALLERY */}
          <div className={styles.galleryCol}>
            <div className={styles.gallery}>
              {/* thumbnails */}
              <div className={styles.thumbnails}>
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`${styles.shimmer} ${styles.thumbnail}`}
                  />
                ))}
              </div>

              {/* main image */}
              <div className={`${styles.shimmer} ${styles.mainImage}`} />
            </div>
          </div>

          {/* INFO */}
          <div className={styles.infoCol}>
            {/* breadcrumb */}
            <div className={styles.breadcrumb}>
              <span className={`${styles.shimmer} ${styles.crumb}`} />
              <span className={`${styles.shimmer} ${styles.crumbDot}`} />
              <span className={`${styles.shimmer} ${styles.crumb}`} />
              <span className={`${styles.shimmer} ${styles.crumbDot}`} />
              <span className={`${styles.shimmer} ${styles.crumbLg}`} />
            </div>

            {/* title */}
            <span className={`${styles.shimmer} ${styles.title}`} />

            {/* rating row */}
            <div className={styles.ratingRow}>
              <span className={`${styles.shimmer} ${styles.stars}`} />
              <span className={`${styles.shimmer} ${styles.ratingValue}`} />
              <span className={`${styles.shimmer} ${styles.ratingValueSm}`} />
            </div>

            {/* price */}
            <div className={styles.priceRow}>
              <span className={`${styles.shimmer} ${styles.price}`} />
              <span className={`${styles.shimmer} ${styles.oldPrice}`} />
            </div>

            {/* description lines */}
            <span className={`${styles.shimmer} ${styles.line}`} />
            <span className={`${styles.shimmer} ${styles.line}`} />
            <span className={`${styles.shimmer} ${styles.lineShort}`} />

            {/* color swatches */}
            <div className={styles.variantBlock}>
              <span className={`${styles.shimmer} ${styles.variantLabel}`} />
              <div className={styles.colorRow}>
                {[1, 2, 3].map((c) => (
                  <span
                    key={c}
                    className={`${styles.shimmer} ${styles.colorSwatch}`}
                  />
                ))}
              </div>
            </div>

            {/* size boxes */}
            <div className={styles.variantBlock}>
              <span className={`${styles.shimmer} ${styles.variantLabel}`} />
              <div className={styles.sizeRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`${styles.shimmer} ${styles.sizeBox}`}
                  />
                ))}
              </div>
            </div>

            {/* action row */}
            <div className={styles.actionRow}>
              <span className={`${styles.shimmer} ${styles.stepper}`} />
              <span className={`${styles.shimmer} ${styles.addToCart}`} />
              <span className={`${styles.shimmer} ${styles.wishlist}`} />
            </div>

            {/* trust row */}
            <div className={styles.trustRow}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.trustItem}>
                  <span className={`${styles.shimmer} ${styles.trustIcon}`} />
                  <span className={`${styles.shimmer} ${styles.trustText}`} />
                </div>
              ))}
            </div>

            {/* accordion */}
            <div className={styles.accordion}>
              <span className={`${styles.shimmer} ${styles.accordionHeader}`} />
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className={styles.relatedRow}>
          <span className={`${styles.shimmer} ${styles.relatedHeading}`} />

          <div className={styles.relatedGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.relatedCard}>
                <div className={`${styles.shimmer} ${styles.relatedImage}`} />
                <span className={`${styles.shimmer} ${styles.relatedLineXs}`} />
                <span className={`${styles.shimmer} ${styles.relatedLineMd}`} />
                <span className={`${styles.shimmer} ${styles.relatedLineSm}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
