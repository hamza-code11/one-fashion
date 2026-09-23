'use client';

import React, { useMemo, useState } from 'react';
import { Product } from '@/types/Product';
import ShopHeader from '../Header/Header';
import Toolbar, { SortValue } from '../Toolbar/Toolbar';
import Sidebar from '../Sidebar/Sidebar';
import FilterDrawer from '../Filterdrawer/Filterdrawer';
import ProductGrid from '../Productgrid/Productgrid';
import styles from './ShopPage.module.css';

interface ShopPageProps {
  products: Product[];
}

export default function ShopPage({ products }: ShopPageProps) {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<SortValue>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedGenders([]);
    setSelectedCategories([]);
  };

  const filteredProducts = useMemo(() => {
    let base = products;

    if (selectedGenders.length > 0) {
      base = base.filter((p) => selectedGenders.includes(p.gender));
    }

    if (selectedCategories.length > 0) {
      base = base.filter((p) => selectedCategories.includes(p.category));
    }

    const sorted = [...base];

    switch (sortValue) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, selectedGenders, selectedCategories, sortValue]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ShopHeader />

        <div className={styles.layout}>
          <Sidebar
            selectedGenders={selectedGenders}
            onGenderToggle={toggleGender}
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            onClear={clearFilters}
          />

          <div className={styles.content}>
            <Toolbar
              productCount={filteredProducts.length}
              sortValue={sortValue}
              onSortChange={setSortValue}
              onOpenFilters={() => setIsFilterOpen(true)}
              activeFilterCount={selectedGenders.length + selectedCategories.length}
            />

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedGenders={selectedGenders}
        onGenderToggle={toggleGender}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        onClear={clearFilters}
      />
    </div>
  );
}