// components/admin/newsletters/NewslettersPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import Pagination from '@/components/commen/Pagination/Pagination';
import styles from './Newsletters.module.css';

/* =========================================================
   TYPES
========================================================= */

interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string; // ISO date
}

/* =========================================================
   MOCK DATA (replace with API later)
========================================================= */

const SUBSCRIBERS: Subscriber[] = [
  { id: 1, email: 'ayesha.khan@example.com', subscribedAt: '2026-01-12' },
  { id: 2, email: 'zain.ali@example.com', subscribedAt: '2026-01-11' },
  { id: 3, email: 'hira.m@example.com', subscribedAt: '2026-01-10' },
  { id: 4, email: 'ali.raza@example.com', subscribedAt: '2026-01-09' },
  { id: 5, email: 'sara.n@example.com', subscribedAt: '2026-01-08' },
  { id: 6, email: 'hamza98.dev@gmail.com', subscribedAt: '2026-01-07' },
  { id: 7, email: 'maryam.t@example.com', subscribedAt: '2026-01-06' },
  { id: 8, email: 'bilal.ahmed@example.com', subscribedAt: '2026-01-05' },
  { id: 9, email: 'noor.f@example.com', subscribedAt: '2026-01-04' },
  { id: 10, email: 'hassan.k@example.com', subscribedAt: '2026-01-03' },
  { id: 11, email: 'fatima.s@example.com', subscribedAt: '2026-01-02' },
  { id: 12, email: 'usman.j@example.com', subscribedAt: '2026-01-01' },
];

const PAGE_SIZE = 8;

/* =========================================================
   HELPERS
========================================================= */

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/* =========================================================
   PAGE
========================================================= */

export default function NewslettersPage() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* -------- filter -------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUBSCRIBERS;
    return SUBSCRIBERS.filter((s) => s.email.toLowerCase().includes(q));
  }, [query]);

  /* reset page on query change */
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  /* -------- paginate -------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  /* -------- actions -------- */
  const handleDelete = (email: string) => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Remove "${email}" from the list?`)
    ) {
      // hook up delete flow here
      console.log('Delete', email);
    }
  };

  /* -------- render -------- */
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Newsletters</h2>
          <p className={styles.subtitle}>
            {filtered.length}{' '}
            {filtered.length === 1 ? 'subscriber' : 'subscribers'} in your list.
          </p>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email…"
            aria-label="Search subscribers"
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE */}
      {pageItems.length === 0 ? (
        <div className={styles.empty}>
          <p>No subscribers match your search.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th className={styles.colDate}>Subscribed</th>
                <th className={styles.colActions}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((s) => (
                <tr key={s.id}>
                  {/* EMAIL */}
                  <td>
                    <span className={styles.emailText}>{s.email}</span>
                  </td>

                  {/* DATE */}
                  <td className={styles.colDate}>
                    {formatDate(s.subscribedAt)}
                  </td>

                  {/* ACTIONS */}
                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionDanger}`}
                        onClick={() => handleDelete(s.email)}
                        aria-label={`Delete ${s.email}`}
                        title="Remove"
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
