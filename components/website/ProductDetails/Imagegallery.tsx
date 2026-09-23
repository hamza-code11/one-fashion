// components/website/product/ProductPage/Imagegallery.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import styles from './Imagegallery.module.css';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  badge?: 'NEW' | 'SALE' | 'HOT';
}

export default function ImageGallery({ images, alt, badge }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // ---------- Lightbox handlers ----------
  const openLightbox = () => {
    setLightboxOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  return (
    <>
      <div className={styles.gallery}>
        {/* THUMBNAILS */}
        <div className={styles.thumbnails}>
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`${styles.thumbnail} ${
                index === activeIndex ? styles.thumbnailActive : ''
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                fill
                sizes="80px"
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div
          className={styles.mainImageWrapper}
          onClick={openLightbox}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openLightbox();
          }}
          aria-label="Open image in fullscreen"
        >
          {badge && <span className={styles.badge}>{badge}</span>}

          <Image
            src={images[activeIndex]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.mainImage}
            priority
          />

          {/* zoom hint overlay */}
          <span className={styles.zoomHint}>
            <ZoomIn size={16} strokeWidth={2} />
            Click to zoom
          </span>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={handleBackdropClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* top-right controls */}
          <div className={styles.lightboxControls}>
            <button
              type="button"
              onClick={zoomOut}
              aria-label="Zoom out"
              className={styles.ctrlBtn}
            >
              <ZoomOut size={18} />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              aria-label="Zoom in"
              className={styles.ctrlBtn}
            >
              <ZoomIn size={18} />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              aria-label="Reset zoom"
              className={styles.ctrlBtn}
            >
              <RotateCcw size={18} />
            </button>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className={styles.ctrlBtn}
            >
              <X size={20} />
            </button>
          </div>

          {/* image */}
          <div
            className={styles.lightboxImageWrap}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            style={{
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex]}
              alt={alt}
              draggable={false}
              className={styles.lightboxImage}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 150ms ease-out',
              }}
            />
          </div>

          {/* thumbnails inside lightbox */}
          <div className={styles.lightboxThumbs}>
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                className={`${styles.lightboxThumb} ${
                  index === activeIndex ? styles.lightboxThumbActive : ''
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  setZoom(1);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${alt} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}