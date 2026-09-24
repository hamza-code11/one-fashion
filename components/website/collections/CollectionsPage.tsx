// components/website/collections/CollectionsPage.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/collections';
import styles from './CollectionsPage.module.css';

export default function CollectionsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Explore</span>
          <h1 className={styles.title}>All Collections</h1>
          <p className={styles.description}>
            Curated edits for every season, mood and moment — thoughtfully made
            for little personalities.
          </p>
        </header>

        {/* BENTO GRID */}
        <div className={styles.bento}>
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={collection.slug}
              className={`${styles.tile} ${styles[`tile${index + 1}`]}`}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.image}
              />

              <div className={styles.overlay} />

              <span className={styles.badge}>
                {collection.productCount} items
              </span>

              <div className={styles.content}>
                <h2 className={styles.name}>{collection.name}</h2>
                <p className={styles.text}>{collection.description}</p>

                <span className={styles.cta}>
                  Shop Collection
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}