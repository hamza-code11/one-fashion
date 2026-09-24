// components/admin/brands/BrandsPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { brands as allBrands } from '@/data/brands';
import { Brand } from '@/types/Brand';
import Pagination from '@/components/commen/Pagination/Pagination';
import styles from './Brands.module.css';

const PAGE_SIZE = 6;

export default function BrandsPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* -------- filter -------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allBrands;

    return allBrands.filter((b) =>
      [b.name, b.slug, b.description].join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  /* -------- paginate -------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  /* -------- handlers -------- */
  const handleEdit = (brand: Brand) => {
    router.push(`/admin/brands/${brand.id}/edit`);
  };

  const handleDelete = (brand: Brand) => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Delete brand "${brand.name}"?`)
    ) {
      console.log('Delete', brand);
    }
  };

  /* -------- render -------- */
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Brands</h2>
          <p className={styles.subtitle}>
            {filtered.length}{' '}
            {filtered.length === 1 ? 'brand' : 'brands'} in your catalog.
          </p>
        </div>

        <Link href="/admin/brands/new" className={styles.addBtn}>
          <Plus size={16} strokeWidth={2.2} />
          Add Brand
        </Link>
      </header>

      {/* SEARCH */}
      <div className={styles.searchWrap}>
        <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brands…"
          aria-label="Search brands"
          className={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      {pageItems.length === 0 ? (
        <div className={styles.empty}>
          <p>No brands match your search.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colImage}>Logo</th>
                <th>Brand</th>
                <th className={styles.colSlug}>Slug</th>
                <th className={styles.colCount}>Products</th>
                <th className={styles.colActions}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((b) => (
                <tr key={b.id}>
                  <td className={styles.colImage}>
                    <div className={styles.thumb}>
                      <Image
                        src={b.logo}
                        alt={b.name}
                        fill
                        sizes="56px"
                        className={styles.thumbImg}
                      />
                    </div>
                  </td>

                  <td>
                    <div className={styles.brandCell}>
                      <span className={styles.brandName}>{b.name}</span>
                      <span className={styles.brandDesc}>{b.description}</span>
                    </div>
                  </td>

                  <td className={styles.colSlug}>
                    <code className={styles.slug}>{b.slug}</code>
                  </td>

                  <td className={styles.colCount}>
                    <span className={styles.countBadge}>{b.productCount}</span>
                  </td>

                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => handleEdit(b)}
                        aria-label={`Edit ${b.name}`}
                        title="Edit"
                      >
                        <Pencil size={15} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionDanger}`}
                        onClick={() => handleDelete(b)}
                        aria-label={`Delete ${b.name}`}
                        title="Delete"
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

