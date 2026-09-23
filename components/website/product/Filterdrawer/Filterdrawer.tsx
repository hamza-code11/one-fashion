'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import FilterPanel from '../Filterpanel/Filterpanel';
import styles from './Filterdrawer.module.css';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGenders: string[];
  onGenderToggle: (gender: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClear: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedGenders,
  onGenderToggle,
  selectedCategories,
  onCategoryToggle,
  onClear,
}: FilterDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Filters</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <FilterPanel
            selectedGenders={selectedGenders}
            onGenderToggle={onGenderToggle}
            selectedCategories={selectedCategories}
            onCategoryToggle={onCategoryToggle}
          />
        </div>

        <div className={styles.drawerFooter}>
          <button type="button" className={styles.clearBtn} onClick={onClear}>
            Clear All
          </button>
          <button type="button" className={styles.applyBtn} onClick={onClose}>
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
