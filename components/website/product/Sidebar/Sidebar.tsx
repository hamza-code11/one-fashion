'use client';

import React from 'react';
import FilterPanel from '../Filterpanel/Filterpanel';
import styles from './Sidebar.module.css';

interface SidebarProps {
  selectedGenders: string[];
  onGenderToggle: (gender: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClear: () => void;
}

export default function Sidebar({
  selectedGenders,
  onGenderToggle,
  selectedCategories,
  onCategoryToggle,
  onClear,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Filters</h2>

        {selectedGenders.length > 0 && (
          <button type="button" className={styles.clearBtn} onClick={onClear}>
            Clear
          </button>
        )}
      </div>

      <FilterPanel
  selectedGenders={selectedGenders}
  onGenderToggle={onGenderToggle}
  selectedCategories={selectedCategories}
  onCategoryToggle={onCategoryToggle}
/>
    </aside>
  );
}