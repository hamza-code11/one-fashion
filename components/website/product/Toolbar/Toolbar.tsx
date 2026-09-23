'use client';

import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import styles from './Toolbar.module.css';

export type SortValue = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface ToolbarProps {
  productCount: number;
  sortValue: SortValue;
  onSortChange: (value: SortValue) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Toolbar({
  productCount,
  sortValue,
  onSortChange,
  onOpenFilters,
  activeFilterCount,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <p className={styles.count}>
        <strong>{productCount}</strong> products
      </p>

      <div className={styles.actions}>
        {/* Only visible on mobile/tablet (CSS) — sidebar covers this role on desktop */}
        <button
          type="button"
          className={styles.filterBtn}
          onClick={onOpenFilters}
          aria-haspopup="dialog"
        >
          <SlidersHorizontal size={15} strokeWidth={2} />
          Filters
          {activeFilterCount > 0 && <span className={styles.badge}>{activeFilterCount}</span>}
        </button>

        <div className={styles.sortWrap}>
          <select
            className={styles.sortSelect}
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value as SortValue)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label.toUpperCase()}
              </option>
            ))}
          </select>
          <ChevronDown size={15} className={styles.sortIcon} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
