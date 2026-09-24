// components/website/collections/CollectionProductsPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products as allProducts } from '@/data/products';
import { collections } from '@/data/collections';
import { Product } from '@/types/Product';
import ProductCard from '@/components/commen/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/website/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import CollectionToolbar from './CollectionToolbar';
import styles from './CollectionProductsPage.module.css';

async function fetchCollectionProducts(slug: string): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 800));
  // Backend ke waqt:
  // const res = await fetch(`/api/collections/${slug}/products`);
  // if (!res.ok) throw new Error('Failed to load collection');
  // return res.json();
  return allProducts;
}

export default function CollectionProductsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ? `/collections/${params.slug}` : '';

  const collection = collections.find((c) => c.slug === slug);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  const [gender, setGender] = useState('all');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setHasError(false);

    fetchCollectionProducts(params.slug)
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
  }, [params.slug]);

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

  // 404-ish fallback — collection not found
  if (!collection && !isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Collection not found</h1>
            <p className={styles.notFoundText}>
              The collection you are looking for does not exist or has been
              moved.
            </p>
            <Link href="/collections" className={styles.notFoundBtn}>
              Browse all collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/collections" className={styles.breadcrumbLink}>
              Collections
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>
              {collection?.name ?? 'Collection'}
            </span>
          </nav>

          <h1 className={styles.title}>
            {collection?.name ?? 'Collection'}
          </h1>

          {collection?.description && (
            <p className={styles.subtitle}>{collection.description}</p>
          )}

          <p className={styles.description}>
            Explore every piece from this edit — thoughtfully designed with
            soft fabrics and thoughtful details for everyday comfort and
            special moments.
          </p>
        </header>

        {/* TOOLBAR */}
        <CollectionToolbar
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
