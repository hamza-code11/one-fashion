// components/website/product/ProductPage/ProductPage.tsx
'use client';

import React from 'react';
import { Product } from '@/types/Product';
import ImageGallery from './Imagegallery';
import ProductInfo from './Productinfo';
import RelatedProducts from './Relatedproducts';
import styles from './Productpage.module.css';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
}

export default function ProductPage({ product, allProducts }: ProductPageProps) {
  const images =
    product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.galleryCol}>
            <ImageGallery images={images} alt={product.name} badge={product.badge} />
          </div>

          <div className={styles.infoCol}>
            <ProductInfo product={product} />
          </div>
        </div>

        <div className={styles.relatedRow}>
          <RelatedProducts
            products={allProducts}
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </div>
    </div>
  );
}