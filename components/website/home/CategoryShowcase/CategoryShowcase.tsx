// components/CategoryShowcase.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CategoryShowcase.module.css';

interface Category {
  id: number;
  title: string;
  description: string;
  linkText: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: 'Furniture',
    description: 'Modern & minimal pieces for every corner of your home.',
    linkText: 'Shop Now',
  },
  {
    id: 2,
    title: 'Lighting',
    description: 'Ambient lamps and pendants to set the perfect mood.',
    linkText: 'Shop Now',
  },
  {
    id: 3,
    title: 'Decor',
    description: 'Handpicked accents that bring warmth and character.',
    linkText: 'Shop Now',
  },
  {
    id: 4,
    title: 'Textiles',
    description: 'Soft rugs, throws and cushions in rich natural tones.',
    linkText: 'Shop Now',
  },
  {
    id: 5,
    title: 'Storage',
    description: 'Smart solutions to keep your space clean and calm.',
    linkText: 'Shop Now',
  },
  {
    id: 6,
    title: 'Outdoor',
    description: 'Durable designs built for balconies, patios and gardens.',
    linkText: 'Shop Now',
  },
];

const VISIBLE_CARDS = 3;
const AUTO_PLAY_INTERVAL = 3000;

const CategoryShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = categories.length;
  const activeCard = activeIndex % total;

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Position track so active card is centered
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidthPercent = 100 / total;
    const shift =
      cardWidthPercent * activeIndex -
      cardWidthPercent * (VISIBLE_CARDS / 2) +
      cardWidthPercent / 2;

    track.style.transform = `translateX(-${shift}%)`;
  }, [activeIndex, total]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      className={styles.wrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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

        {/* Decorative dots */}
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dotBlue} />
          <span className={styles.dotOrange} />
          <span className={styles.dotPink} />
        </div>
      </div>

      {/* Decorative flower */}
      <div className={styles.flower} aria-hidden="true">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <circle cx="21" cy="8" r="6" fill="var(--color-accent-yellow)" />
          <circle cx="34" cy="21" r="6" fill="var(--color-accent-pink)" />
          <circle cx="21" cy="34" r="6" fill="var(--color-accent-blue)" />
          <circle cx="8" cy="21" r="6" fill="var(--color-accent-green)" />
          <circle cx="21" cy="21" r="5" fill="var(--color-white)" />
        </svg>
      </div>

      {/* DIVIDER */}
      <div className={styles.divider} />

      {/* CAROUSEL */}
      <div className={styles.carousel}>
        <div className={styles.track} ref={trackRef}>
          {categories.map((cat, index) => {
            const isActive = index === activeCard;
            return (
              <article
                key={cat.id}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardClick(index);
                }}
              >
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.description}</p>
                <a className={styles.cardLink} href="#">
                  {cat.linkText}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
