// components/website/collections/CollectionToolbar.tsx
'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './CollectionToolbar.module.css';

interface CollectionToolbarProps {
  total: number;
  gender: string;
  category: string;
  genders: string[];
  categories: string[];
  onGenderChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export default function CollectionToolbar({
  total,
  gender,
  category,
  genders,
  categories,
  onGenderChange,
  onCategoryChange,
  onClear,
  isLoading = false,
}: CollectionToolbarProps) {
  const hasFilters = gender !== 'all' || category !== 'all';

  return (
    <div className={styles.toolbar}>
      {/* LEFT — count */}
      <div className={styles.count}>
        {isLoading ? (
          <span className={styles.countSkeleton} />
        ) : (
          <>
            <span className={styles.countNumber}>{total}</span>
            <span className={styles.countLabel}>
              {total === 1 ? 'product' : 'products'}
            </span>
          </>
        )}
      </div>

      {/* RIGHT — dropdowns */}
      <div className={styles.filters}>
        {/* GENDER */}
        <div className={styles.selectWrap}>
          <select
            value={gender}
            onChange={(e) => onGenderChange(e.target.value)}
            className={styles.select}
            aria-label="Filter by gender"
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g === 'all' ? 'All Genders' : g}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={styles.selectIcon}
            aria-hidden="true"
          />
        </div>

        {/* CATEGORY */}
        <div className={styles.selectWrap}>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={styles.select}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={styles.selectIcon}
            aria-hidden="true"
          />
        </div>

        {/* CLEAR */}
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className={styles.clearBtn}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
