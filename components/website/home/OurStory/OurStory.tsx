// components/website/home/OurStory/OurStory.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './OurStory.module.css';

interface OurStoryProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const OurStory: React.FC<OurStoryProps> = ({
  eyebrow = 'Our Story',
  heading = 'Made with love, for little ones',
  paragraphs = [
    'One + One started with a simple idea — clothing that lets kids be kids. Soft fabrics, easy fits, and colours that make every day a little brighter.',
    'Designed in Pakistan and crafted with care, our pieces are made for playgrounds, family gatherings, and every small adventure in between.',
  ],
  ctaLabel = 'Discover Our Story',
  ctaHref = '/about',
  imageSrc = 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1200&q=80',
  imageAlt = 'Kids playing in the park wearing our collection',
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrap}>

          {/* IMAGE */}
          <div className={styles.imageSide}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
          </div>

          {/* TEXT */}
          <div className={styles.textSide}>
            <span className={styles.eyebrow}>{eyebrow}</span>

            <h2 className={styles.heading}>{heading}</h2>

            {paragraphs.map((para, i) => (
              <p key={i} className={styles.paragraph}>
                {para}
              </p>
            ))}

            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;
