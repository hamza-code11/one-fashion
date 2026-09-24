// components/website/newArrivals/NewArrivalsPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { products as allProducts } from '@/data/products';
import { Product } from '@/types/Product';
import ProductCard from '@/components/commen/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/website/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import NewArrivalsToolbar from './NewArrivalsToolbar';
import styles from './NewArrivalsPage.module.css';

async function fetchNewArrivals(): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 800));
  // Backend ke waqt:
  // const res = await fetch('/api/products?filter=new');
  // if (!res.ok) throw new Error('Failed to load new arrivals');
  // return res.json();
  return allProducts;
}

export default function NewArrivalsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  const [gender, setGender] = useState('all');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setHasError(false);

    fetchNewArrivals()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setHasError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const genders = useMemo(
    () => ['all', ...Array.from(new Set(items.map((p) => p.gender)))],
    [items]
  );

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(items.map((p) => p.category)))],
    [items]
  );

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (gender !== 'all' && p.gender !== gender) return false;
      if (category !== 'all' && p.category !== category) return false;
      return true;
    });
  }, [items, gender, category]);

  const handleClear = () => {
    setGender('all');
    setCategory('all');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER — static */}
        <header className={styles.header}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>New Arrivals</span>
          </nav>

          <h1 className={styles.title}>New Arrivals</h1>
          <p className={styles.subtitle}>
            Just in — fresh drops for every little personality.
          </p>
          <p className={styles.description}>
            The newest pieces from our latest collection, designed with soft
            fabrics and thoughtful details for everyday comfort and special
            moments.
          </p>
        </header>

        {/* TOOLBAR — count + dropdowns */}
        <NewArrivalsToolbar
          total={filtered.length}
          gender={gender}
          category={category}
          genders={genders}
          categories={categories}
          onGenderChange={setGender}
          onCategoryChange={setCategory}
          onClear={handleClear}
          isLoading={isLoading}
        />

        {/* PRODUCTS */}
        {hasError ? (
          <div className={styles.message}>
            Products load nahi ho sake. Please dobara try karein.
          </div>
        ) : !isLoading && filtered.length === 0 ? (
          <div className={styles.message}>
            Koi product is filter ke saath match nahi karta.{' '}
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearInline}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid} aria-busy={isLoading}>
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

