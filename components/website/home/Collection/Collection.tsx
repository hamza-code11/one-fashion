// components/website/home/Collection/Collection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products as allProducts } from '@/data/products';
import ProductCard from '@/components/commen/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/website/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import styles from './Collection.module.css';

type Product = (typeof allProducts)[number];

interface CollectionProps {
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  limit?: number;
}

// Backend lagate waqt SIRF is function ko badalna hai.
async function fetchCollectionProducts(limit: number): Promise<Product[]> {
  // TEMP: fake delay. Deploy se pehle yeh line DELETE karo.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return allProducts.slice(0, limit);

  // Backend ke waqt:
  // const res = await fetch(`/api/products?limit=${limit}`);
  // if (!res.ok) throw new Error('Failed to load products');
  // return res.json();
}

const Collection: React.FC<CollectionProps> = ({
  title = 'Winter Collection',
  subtitle = 'Cosy layers and warm essentials for the season.',
  viewAllHref = '/collections/winter',
  limit = 10,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    fetchCollectionProducts(limit)
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
  }, [limit]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Seasonal Edit</span>
            <h2 className={styles.heading}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>

          <Link href={viewAllHref} className={styles.viewAll}>
            View All
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </header>

        {hasError ? (
          <p role="alert">Products load nahi ho sake. Please dobara try karein.</p>
        ) : !isLoading && items.length === 0 ? (
          <p>Abhi is collection mein koi product nahi hai.</p>
        ) : (
          <div className={styles.grid} aria-busy={isLoading}>
            {isLoading
              ? Array.from({ length: limit }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;