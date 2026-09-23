// components/CategoryShowcase.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './CategoryShowcase.module.css';
import { categories } from '@/data/categories';

const AUTO_PLAY_INTERVAL = 3000;
const SLIDE_DURATION = 700;

// Breakpoints → how many cards are visible at once
const BREAKPOINTS = [
  { maxWidth: 480, visible: 3 },
  { maxWidth: 860, visible: 3 },
  { maxWidth: 1180, visible: 5 },
  { maxWidth: Infinity, visible: 5 },
];

function getVisibleCount(width: number): number {
  const match = BREAKPOINTS.find((bp) => width <= bp.maxWidth);
  return match ? match.visible : 5;
}

const CategoryShowcase: React.FC = () => {
  const ORIGINAL = categories.length;

  // Triple the list for infinite loop — no visible jump
  const looped = useMemo(() => [...categories, ...categories, ...categories], []);
  const TOTAL = looped.length;

  const [visibleCards, setVisibleCards] = useState(5);
  const centerSlot = Math.floor(visibleCards / 2);

  // Start in the middle block, offset so active is truly centered
  const [activeIndex, setActiveIndex] = useState(ORIGINAL);
  const [isPaused, setIsPaused] = useState(false);
  const [noTransition, setNoTransition] = useState(false);

  // Track viewport width → adjust visible card count responsively
  useEffect(() => {
    const updateVisible = () => setVisibleCards(getVisibleCount(window.innerWidth));
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  // Auto-play — always move forward by 1
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Silent reset when we cross into the 3rd block
  useEffect(() => {
    if (activeIndex < ORIGINAL * 2) return;
    const t = setTimeout(() => {
      setNoTransition(true);
      setActiveIndex((prev) => prev - ORIGINAL);
    }, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [activeIndex, ORIGINAL]);

  // Re-enable transition next frame
  useEffect(() => {
    if (!noTransition) return;
    const id = requestAnimationFrame(() => setNoTransition(false));
    return () => cancelAnimationFrame(id);
  }, [noTransition]);

  const handleCardClick = (index: number) => setActiveIndex(index);

  // The card that is currently in the CENTER slot of the visible window
  const activeCardIndex = activeIndex;

  // Each card occupies (100 / TOTAL) % of the track.
  // We want activeCardIndex to sit at slot centerSlot (0-indexed within the visible window).
  const cardWidthPct = 100 / TOTAL;
  const shiftPct = (activeCardIndex - centerSlot) * cardWidthPct;

  return (
    <section
      className={styles.wrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={
        {
          '--total-cards': TOTAL,
          '--visible-cards': visibleCards,
        } as React.CSSProperties
      }
    >
      {/* LEFT PANEL */}
      <div className={styles.left}>
        <h2 className={styles.heading}>
          Brand <br /> Category
        </h2>
        <p className={styles.description}>
          Explore our curated collections designed to fit every style and space.
        </p>
        <button className={styles.shopBtn} type="button">
          Shop All
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* DIVIDER */}
      <div className={styles.divider} />

      {/* CAROUSEL */}
      <div className={styles.carousel}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${shiftPct}%)`,
            transition: noTransition
              ? 'none'
              : `transform ${SLIDE_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`,
          }}
        >
          {looped.map((cat, index) => {
            const isActive = index === activeCardIndex;
            return (
              <article
                key={`${cat.id}-${index}`}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardClick(index);
                }}
              >
                <div
                  className={styles.cardInner}
                  style={{ backgroundImage: `url(${cat.image})` }}
                >
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{cat.title}</h3>
                    <Link href={cat.href} className={styles.cardLink}>
                      Shop Now
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;