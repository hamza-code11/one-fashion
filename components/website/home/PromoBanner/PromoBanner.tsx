// components/website/home/PromoBanner/PromoBanner.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './PromoBanner.module.css';

interface PromoBannerProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function PromoBanner({
  eyebrow = 'Limited Time',
  heading = 'Up to 40% Off Season Picks',
  description = 'Refresh their wardrobe with our favourite everyday essentials — soft fabrics, bright colours, and prices that make you smile.',
  ctaLabel = 'Shop the Sale',
  ctaHref = '/shop/sale',
  imageSrc = '/banner/02.jfif',
  imageAlt = 'Kids wearing colorful outfits',
}: PromoBannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.banner}>
          {/* overlay for content highlight */}
          <div className={styles.overlay} />

          {/* CONTENT */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.description}>{description}</p>

            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </Link>
          </div>

          {/* IMAGE */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
