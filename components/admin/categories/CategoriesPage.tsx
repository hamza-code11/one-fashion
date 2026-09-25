// components/admin/categories/CategoriesPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { categories as allCategories } from '@/data/categories';
import { Category } from '@/types/Category';
import Pagination from '@/components/commen/Pagination/Pagination';
import styles from './Categories.module.css';

const PAGE_SIZE = 6;

export default function CategoriesPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* -------- filter -------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCategories;

    return allCategories.filter((c) =>
      [c.title, c.slug, c.description].join(' ').toLowerCase().includes(q)
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
  const handleEdit = (category: Category) => {
    router.push(`/admin/categories/${category.id}/edit`);
  };

  const handleDelete = (category: Category) => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Delete category "${category.title}"?`)
    ) {
      console.log('Delete', category);
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Categories</h2>
          <p className={styles.subtitle}>
            {filtered.length}{' '}
            {filtered.length === 1 ? 'category' : 'categories'} in your catalog.
          </p>
        </div>

        <Link href="/admin/categories/new" className={styles.addBtn}>
          <Plus size={16} strokeWidth={2.2} />
          Add Category
        </Link>
      </header>

      {/* SEARCH */}
      <div className={styles.searchWrap}>
        <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search categories…"
          aria-label="Search categories"
          className={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      {pageItems.length === 0 ? (
        <div className={styles.empty}>
          <p>No categories match your search.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colImage}>Image</th>
                <th>Category</th>
                <th className={styles.colSlug}>Slug</th>
                <th className={styles.colActions}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((c) => (
                <tr key={c.id}>
                  <td className={styles.colImage}>
                    <div className={styles.thumb}>
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="56px"
                        className={styles.thumbImg}
                      />
                    </div>
                  </td>

                  <td>
                    <div className={styles.catCell}>
                      <span className={styles.catName}>{c.title}</span>
                      <span className={styles.catDesc}>{c.description}</span>
                    </div>
                  </td>

                  <td className={styles.colSlug}>
                    <code className={styles.slug}>{c.slug}</code>
                  </td>

                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => handleEdit(c)}
                        aria-label={`Edit ${c.title}`}
                        title="Edit"
                      >
                        <Pencil size={15} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionDanger}`}
                        onClick={() => handleDelete(c)}
                        aria-label={`Delete ${c.title}`}
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
