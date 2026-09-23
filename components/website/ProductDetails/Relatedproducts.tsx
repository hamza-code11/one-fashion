import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/Product';
import ProductGrid from '@/components/website/product/Productgrid/Productgrid';
import styles from '../ProductDetails/Relatedproducts.module.css';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number;
  category: string;
}

export default function RelatedProducts({
  products,
  currentProductId,
  category,
}: RelatedProductsProps) {
  const related = products
    .filter((product) => product.id !== currentProductId && product.category === category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.header}>
        <h2 className={styles.title}>You May Also Like</h2>
        <Link href="/product" className={styles.viewAll}>
          View All
        </Link>
      </div>
      <ProductGrid products={related} />
    </section>
  );
}
