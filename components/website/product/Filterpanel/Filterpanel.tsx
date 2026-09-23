'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Filterpanel.module.css';

interface FilterPanelProps {
  selectedGenders: string[];
  onGenderToggle: (gender: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const GENDER_OPTIONS = ['Girls', 'Boys', 'Baby'];
const CATEGORY_OPTIONS = [
  'Frocks & Dresses',
  'T-Shirts & Polos',
  'Jackets & Cardigans',
  'Pants & Bottoms',
  'Co-ord Sets',
  'Bodysuits & Rompers',
];
const AGE_OPTIONS = ['0–1 Years', '1–2 Years', '2–4 Years', '4–6 Years', '6–8 Years'];
const COLOR_OPTIONS = [
  { name: 'Pink', hex: '#e3aab8' },
  { name: 'Olive', hex: '#594f07' },
  { name: 'Cream', hex: '#dacec4' },
  { name: 'Brown', hex: '#6e3621' },
  { name: 'Black', hex: '#000000' },
];
const PRICE_OPTIONS = [
  'Under PKR 2,000',
  'PKR 2,000 – 4,000',
  'PKR 4,000 – 6,000',
  'Above PKR 6,000',
];
const AVAILABILITY_OPTIONS = ['In Stock', 'Out of Stock'];

function AccordionSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.section}>
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        {open ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
      </button>

      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

export default function FilterPanel({
  selectedGenders,
  onGenderToggle,
  selectedCategories,
  onCategoryToggle,
}: FilterPanelProps) {
  // Age / Color / Price / Availability are presentational placeholders for now —
  // wire them into ShopPage's filtering logic the same way Gender/Category are wired
  // once real attributes exist on the Product data.
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const toggle = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  return (
    <div className={styles.panel}>
      <AccordionSection title="Gender" defaultOpen>
        <div className={styles.checkboxList}>
          {GENDER_OPTIONS.map((gender) => (
            <label key={gender} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedGenders.includes(gender)}
                onChange={() => onGenderToggle(gender)}
              />
              <span>{gender}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Category" defaultOpen>
        <div className={styles.checkboxList}>
          {CATEGORY_OPTIONS.map((category) => (
            <label key={category} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Age">
        <div className={styles.checkboxList}>
          {AGE_OPTIONS.map((age) => (
            <label key={age} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedAges.includes(age)}
                onChange={() => toggle(age, selectedAges, setSelectedAges)}
              />
              <span>{age}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Color">
        <div className={styles.colorList}>
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.name}
              type="button"
              className={`${styles.colorSwatch} ${
                selectedColors.includes(color.name) ? styles.colorSwatchActive : ''
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => toggle(color.name, selectedColors, setSelectedColors)}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Price">
        <div className={styles.checkboxList}>
          {PRICE_OPTIONS.map((price) => (
            <label key={price} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedPrices.includes(price)}
                onChange={() => toggle(price, selectedPrices, setSelectedPrices)}
              />
              <span>{price}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Availability">
        <div className={styles.checkboxList}>
          {AVAILABILITY_OPTIONS.map((item) => (
            <label key={item} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedAvailability.includes(item)}
                onChange={() => toggle(item, selectedAvailability, setSelectedAvailability)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
