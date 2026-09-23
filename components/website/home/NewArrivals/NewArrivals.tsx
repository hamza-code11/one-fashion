// components/website/home/NewArrivals/NewArrivals.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products as allProducts } from '@/data/products';
import ProductCard from '@/components/commen/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/website/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import styles from './NewArrivals.module.css';

type Product = (typeof allProducts)[number];

// Backend lagate waqt SIRF is function ko badalna hai.
async function fetchNewArrivals(limit: number): Promise<Product[]> {
  // TEMP: fake delay. Deploy se pehle yeh line DELETE karo.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return allProducts.slice(0, limit);

  // Backend ke waqt:
  // const res = await fetch(`/api/products?filter=new&limit=${limit}`);
  // if (!res.ok) throw new Error('Failed to load new arrivals');
  // return res.json();
}

const VISIBLE_LIMIT = 8;
const SKELETON_COUNT = 6;

const NewArrivals: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    fetchNewArrivals(VISIBLE_LIMIT)
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

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>('[data-card]');
    const cardWidth = firstCard ? firstCard.offsetWidth : 260;
    const gap = 24;
    const amount = (cardWidth + gap) * 2;

    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Just In</span>
            <h2 className={styles.heading}>New Arrivals</h2>
          </div>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Scroll left"
              onClick={() => scrollByCards('left')}
            >
              <ChevronLeft size={20} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Scroll right"
              onClick={() => scrollByCards('right')}
            >
              <ChevronRight size={20} strokeWidth={1.8} />
            </button>
          </div>
        </header>

        {hasError ? (
          <p role="alert" className={styles.message}>
            Products load nahi ho sake. Please dobara try karein.
          </p>
        ) : !isLoading && items.length === 0 ? (
          <p className={styles.message}>
            Abhi koi new arrival nahi hai.
          </p>
        ) : (
          <div className={styles.scrollWrap}>
            <div
              className={styles.scrollRow}
              ref={scrollRef}
              aria-busy={isLoading}
            >
              {isLoading
                ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <div
                      key={index}
                      className={styles.scrollItem}
                      data-card
                    >
                      <ProductCardSkeleton />
                    </div>
                  ))
                : items.map((product) => (
                    <div
                      key={product.id}
                      className={styles.scrollItem}
                      data-card
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
