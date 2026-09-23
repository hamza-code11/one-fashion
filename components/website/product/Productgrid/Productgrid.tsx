import React from 'react';
import { Product } from '@/types/Product';
import ProductCard from '@/components/commen/ProductCard/ProductCard';
import styles from './Productgrid.module.css';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No products match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
