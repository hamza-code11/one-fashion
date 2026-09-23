// components/website/about/AboutPage.tsx
import React from 'react';
import Image from 'next/image';
import { aboutData } from '@/data/about';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { hero, story, philosophy, quality, qualityStats } = aboutData;

  return (
    <div className={styles.page}>
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.heroEyebrow}>{hero.eyebrow}</span>
          <h1 className={styles.heroHeading}>{hero.heading}</h1>
          <p className={styles.heroSub}>{hero.subheading}</p>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImageWrap}>
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.storyImage}
                priority
              />
            </div>

            <div className={styles.storyText}>
              <span className={styles.eyebrow}>{story.eyebrow}</span>
              <h2 className={styles.sectionHeading}>{story.heading}</h2>
              {story.paragraphs.map((p, i) => (
                <p key={i} className={styles.paragraph}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PHILOSOPHY ============ */}
      <section className={styles.philosophy}>
        <div className={styles.container}>
          <header className={styles.centerHeader}>
            <span className={styles.eyebrow}>{philosophy.eyebrow}</span>
            <h2 className={styles.sectionHeading}>{philosophy.heading}</h2>
            <p className={styles.centerDescription}>{philosophy.description}</p>
          </header>

          <div className={styles.valuesGrid}>
            {philosophy.values.map((value) => (
              <article key={value.id} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUALITY ============ */}
      <section className={styles.quality}>
        <div className={styles.container}>
          <div className={styles.qualityGrid}>
            {/* LEFT: text + stats */}
            <div className={styles.qualityLeft}>
              <span className={styles.eyebrow}>{quality.eyebrow}</span>
              <h2 className={styles.sectionHeading}>{quality.heading}</h2>
              <p className={styles.paragraph}>{quality.description}</p>

              {/* STATS — 2 columns × 2 rows */}
              <div className={styles.statsGrid}>
                {qualityStats.map((stat) => (
                  <div key={stat.id} className={styles.statItem}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: image */}
            <div className={styles.qualityImageWrap}>
              <Image
                src={quality.image}
                alt={quality.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.qualityImage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
