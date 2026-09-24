// components/admin/products/ProductsPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types/Product';
import Pagination from '@/components/commen/Pagination/Pagination';
import styles from './ProductsPage.module.css';

const PAGE_SIZE = 5;

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================================================
     FILTER
  ========================================================= */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) =>
      [p.name, p.category, p.gender, p.brand ?? '']
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  /* reset page on query change */
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  /* =========================================================
     PAGINATE
  ========================================================= */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  /* =========================================================
     HANDLERS
  ========================================================= */
  const handleEdit = (product: Product) => {
    // hook up edit flow here
    console.log('Edit', product);
  };

  const handleDelete = (product: Product) => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Delete "${product.name}"?`)
    ) {
      // hook up delete flow here
      console.log('Delete', product);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Products</h2>
          <p className={styles.subtitle}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} in
            your catalog.
          </p>
        </div>

        <button type="button" className={styles.addBtn}>
          <Plus size={16} strokeWidth={2.2} />
          Add Product
        </button>
      </header>

      {/* SEARCH BAR */}
      <div className={styles.searchWrap}>
        <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, gender…"
          aria-label="Search products"
          className={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      {pageItems.length === 0 ? (
        <div className={styles.empty}>
          <p>No products match your search.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colImage}>Image</th>
                <th>Product</th>
                <th className={styles.colCategory}>Category</th>
                <th className={styles.colGender}>Gender</th>
                <th className={styles.colPrice}>Price</th>
                <th className={styles.colStatus}>Status</th>
                <th className={styles.colActions}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id}>
                  <td className={styles.colImage}>
                    <div className={styles.thumb}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className={styles.thumbImg}
                      />
                    </div>
                  </td>

                  <td>
                    <div className={styles.productCell}>
                      <span className={styles.productName}>{p.name}</span>
                      <span className={styles.productBrand}>{p.brand}</span>
                    </div>
                  </td>

                  <td className={styles.colCategory}>{p.category}</td>
                  <td className={styles.colGender}>{p.gender}</td>

                  <td className={styles.colPrice}>
                    <div className={styles.priceCell}>
                      <span className={styles.price}>
                        PKR {p.price.toLocaleString()}
                      </span>
                      {p.oldPrice && (
                        <span className={styles.oldPrice}>
                          PKR {p.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className={styles.colStatus}>
                    {p.badge ? (
                      <span
                        className={`${styles.badge} ${
                          p.badge === 'NEW'
                            ? styles.badgeNew
                            : p.badge === 'SALE'
                            ? styles.badgeSale
                            : styles.badgeHot
                        }`}
                      >
                        {p.badge}
                      </span>
                    ) : (
                      <span className={styles.badgeMuted}>—</span>
                    )}
                  </td>

                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => handleEdit(p)}
                        aria-label={`Edit ${p.name}`}
                      >
                        <Pencil size={15} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionDanger}`}
                        onClick={() => handleDelete(p)}
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

