// components/Hero/Hero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import styles from './Hero.module.css';

const SLIDE_INTERVAL = 3000;

const slides = [
  {
    id: 1,
    src: '/hero/01.png',
    alt: 'Kids wearing new season outfits, holding hands',
    label: 'New Season',
    headingLines: ['LITTLE', 'LOOKS.', 'BIG', 'PERSONALITY.'],
    description:
      'Discover stylish everyday clothing designed for little personalities — thoughtfully made for the Pakistani family.',
    primaryCta: { label: 'Shop New Arrivals', href: '/shop/new-arrivals' },
    secondaryCta: { label: 'Explore Collection', href: '/collections' },
  },
  {
    id: 2,
    src: '/hero/02.png',
    alt: 'Kids in traditional outfits smiling outdoors',
    label: 'Festive Edit',
    headingLines: ['TRADITION', 'MEETS', 'TINY', 'STYLE.'],
    description:
      'Celebrate every occasion with festive outfits crafted for comfort, colour, and all-day play.',
    primaryCta: { label: 'Shop Festive', href: '/shop/festive' },
    secondaryCta: { label: 'View Lookbook', href: '/collections/festive' },
  },
  {
    id: 3,
    src: '/hero/03.png',
    alt: 'Kids wearing everyday clothing from the collection',
    label: 'Everyday Basics',
    headingLines: ['SOFT.', 'SIMPLE.', 'MADE FOR', 'EVERY DAY.'],
    description:
      'From playdates to school runs — durable, gentle fabrics that keep up with every little adventure.',
    primaryCta: { label: 'Shop Everyday', href: '/shop/everyday' },
    secondaryCta: { label: 'See Collection', href: '/collections/everyday' },
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion.current || slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const current = slides[activeSlide];

  return (
    <section className={styles.hero}>
      {/* LEFT — rotating image */}
      <div className={styles.mediaCol}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === activeSlide ? styles.slideActive : ''
            }`}
            aria-hidden={index !== activeSlide}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.slideImage}
            />
          </div>
        ))}
      </div>

      {/* RIGHT — content (keyed so it re-animates on slide change) */}
      <div className={styles.contentCol}>
        <span className={styles.decorPlus} aria-hidden="true">
          <Plus size={20} strokeWidth={2} />
        </span>

        <div key={current.id} className={styles.contentInner}>
          <span className={styles.label}>{current.label}</span>

          <h1 className={styles.heading}>
            {current.headingLines.map((line, i) => (
              <span
                key={`${current.id}-${i}`}
                className={styles.headingLine}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className={styles.description}
            style={{ animationDelay: `${current.headingLines.length * 80}ms` }}
          >
            {current.description}
          </p>

          <div
            className={styles.actions}
            style={{
              animationDelay: `${(current.headingLines.length + 1) * 80}ms`,
            }}
          >
            <a href={current.primaryCta.href} className={styles.buttonPrimary}>
              {current.primaryCta.label}
            </a>
            <a
              href={current.secondaryCta.href}
              className={styles.buttonSecondary}
            >
              {current.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
