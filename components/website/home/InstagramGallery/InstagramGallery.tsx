// components/website/home/InstagramGallery/InstagramGallery.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import styles from './InstagramGallery.module.css';

interface GalleryItem {
  id: number;
  image: string;
  likes: string;
  comments: string;
  href: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
    likes: '2.4k',
    comments: '128',
    href: 'https://instagram.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
    likes: '1.9k',
    comments: '94',
    href: 'https://instagram.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80',
    likes: '3.1k',
    comments: '176',
    href: 'https://instagram.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80',
    likes: '2.7k',
    comments: '142',
    href: 'https://instagram.com',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80',
    likes: '1.6k',
    comments: '72',
    href: 'https://instagram.com',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&q=80',
    likes: '2.2k',
    comments: '110',
    href: 'https://instagram.com',
  },
];

const INSTAGRAM_URL = 'https://instagram.com';
const HANDLE = '@oneplusone.fashion';

const InstagramGallery: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Follow Us</span>
          <h2 className={styles.heading}>On Instagram</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.handle}
          >
            {HANDLE}
          </a>
        </header>

        {/* GRID */}
        <div className={styles.grid}>
          {galleryItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tile}
            >
              <Image
                src={item.image}
                alt="Instagram post"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className={styles.image}
              />

              {/* HOVER OVERLAY */}
              <div className={styles.overlay}>
                <FaInstagram size={22} strokeWidth={1.8} className={styles.igIcon} />
                <div className={styles.stats}>
                  <span className={styles.stat}>
                    <Heart size={14} strokeWidth={2} fill="currentColor" />
                    {item.likes}
                  </span>
                  <span className={styles.stat}>
                    <MessageCircle size={14} strokeWidth={2} fill="currentColor" />
                    {item.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <FaInstagram size={18} strokeWidth={1.8} />
            Follow Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
