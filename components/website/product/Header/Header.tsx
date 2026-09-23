'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function ShopHeader() {
  return (
    <div className={styles.header}>
      <Link href="/shop" className={styles.breadcrumb}>
        Shop
      </Link>

      <h1 className={styles.title}>Shop All</h1>

      <p className={styles.description}>
        Modern children&apos;s fashion for little personalities — girls, boys and baby.
      </p>
    </div>
  );
}