// components/admin/products/ProductFormFields.tsx
'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { ProductColor } from '@/types/Product';
import styles from './ProductForm.module.css';

export interface ProductFormValues {
  name: string;
  slug: string;
  gender: string;
  category: string;
  brand: string;
  badge: '' | 'NEW' | 'SALE' | 'HOT';
  description: string;
  sizes: string[];
  colors: ProductColor[];
  collections: string[];
  price: string;
  oldPrice: string;
}

interface Props {
  values: ProductFormValues;
  errors: Record<string, string | undefined>;
  onChange: <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K]
  ) => void;
}

const GENDERS = ['Girls', 'Boys', 'Baby'];
const BADGES = ['', 'NEW', 'SALE', 'HOT'] as const;
const COLLECTIONS = ['New Arrivals', 'Winter Edit', 'Summer Breeze', 'Everyday Basics', 'Festive Favourites', 'Baby First', 'Girls Party', 'Boys Denim'];
const BRANDS = ['One + One Fashion', 'Little Threads', 'Bloom & Co.', 'Denim Kids', 'Tiny Explorer'];
const CATEGORIES = ['Frocks & Dresses', 'Co-ord Sets', 'Jackets & Cardigans', 'T-Shirts & Polos', 'Pants & Bottoms', 'Bodysuits & Rompers'];

export default function ProductFormFields({ values, errors, onChange }: Props) {
  const [sizeInput, setSizeInput] = useState('');
  const [colorName, setColorName] = useState('');
  const [colorValue, setColorValue] = useState('#000000');

  /* sizes */
  const addSize = () => {
    const v = sizeInput.trim();
    if (!v || values.sizes.includes(v)) return;
    onChange('sizes', [...values.sizes, v]);
    setSizeInput('');
  };

  const removeSize = (s: string) =>
    onChange('sizes', values.sizes.filter((x) => x !== s));

  /* colors */
  const addColor = () => {
    const n = colorName.trim();
    if (!n) return;
    if (values.colors.some((c) => c.name.toLowerCase() === n.toLowerCase())) return;
    onChange('colors', [...values.colors, { name: n, value: colorValue }]);
    setColorName('');
    setColorValue('#000000');
  };

  const removeColor = (n: string) =>
    onChange('colors', values.colors.filter((c) => c.name !== n));

  /* multi-select toggles */
  const toggleFromList = (
    field: 'collections',
    list: string,
    val: string
  ) => {
    const current = values[field] as string[];
    const next = current.includes(val)
      ? current.filter((x) => x !== val)
      : [...current, val];
    onChange(field, next);
  };

  return (
    <>
      {/* ========================================================
          TOP ROW — Price + Old Price (right aligned)
      ======================================================== */}
      <div className={styles.topRow}>
        <div className={styles.priceGroup}>
          <div className={styles.field}>
            <label htmlFor="price" className={styles.label}>Price (PKR)</label>
            <input
              id="price"
              type="number"
              min={0}
              value={values.price}
              onChange={(e) => onChange('price', e.target.value)}
              placeholder="e.g. 2790"
              className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
            />
            {errors.price && (
              <span className={styles.errorText}>{errors.price}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="oldPrice" className={styles.label}>
              Old Price (optional)
            </label>
            <input
              id="oldPrice"
              type="number"
              min={0}
              value={values.oldPrice}
              onChange={(e) => onChange('oldPrice', e.target.value)}
              placeholder="e.g. 3490"
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          LEFT COLUMN — Name, Slug, Description, Sizes, Colors
      ======================================================== */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Floral Cotton Frock"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Slug</label>
        <div className={styles.slugBox} aria-readonly="true">
          <code className={styles.slugValue}>
            {values.slug || 'product-slug'}
          </code>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
          placeholder="A short description of the product…"
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
        />
        {errors.description && (
          <span className={styles.errorText}>{errors.description}</span>
        )}
      </div>

      {/* SIZES */}
      <div className={styles.field}>
        <label className={styles.label}>Sizes</label>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <input
            type="text"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSize();
              }
            }}
            placeholder="e.g. 4-5Y"
            className={styles.input}
          />
          <button
            type="button"
            onClick={addSize}
            className={styles.inlineBtn}
          >
            <Plus size={15} strokeWidth={2.2} />
            Add
          </button>
        </div>

        {values.sizes.length > 0 && (
          <div className={styles.tags}>
            {values.sizes.map((s) => (
              <span key={s} className={styles.tag}>
                {s}
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={() => removeSize(s)}
                  aria-label={`Remove ${s}`}
                >
                  <X size={11} strokeWidth={2.2} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* COLORS */}
      <div className={styles.field}>
        <label className={styles.label}>Colors</label>
        <div className={styles.colorInputRow}>
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="Color name"
            className={styles.input}
          />
          <input
            type="color"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            className={styles.colorPicker}
            aria-label="Pick color"
          />
          <button
            type="button"
            onClick={addColor}
            className={styles.inlineBtn}
          >
            <Plus size={15} strokeWidth={2.2} />
            Add
          </button>
        </div>

        {values.colors.length > 0 && (
          <div className={styles.swatchGrid}>
            {values.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                className={styles.swatch}
                style={{ backgroundColor: c.value }}
                onClick={() => removeColor(c.name)}
                title={`Click to remove ${c.name}`}
                aria-label={`Remove ${c.name}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          BOTTOM — all dropdowns
      ======================================================== */}
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="gender" className={styles.label}>Gender</label>
          <select
            id="gender"
            value={values.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className={`${styles.select} ${errors.gender ? styles.inputError : ''}`}
          >
            <option value="">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="category" className={styles.label}>Category</label>
          <select
            id="category"
            value={values.category}
            onChange={(e) => onChange('category', e.target.value)}
            className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <span className={styles.errorText}>{errors.category}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="brand" className={styles.label}>Brand</label>
          <select
            id="brand"
            value={values.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            className={styles.select}
          >
            <option value="">Select brand</option>
            {BRANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="badge" className={styles.label}>Badge</label>
          <select
            id="badge"
            value={values.badge}
            onChange={(e) =>
              onChange('badge', e.target.value as ProductFormValues['badge'])
            }
            className={styles.select}
          >
            {BADGES.map((b) => (
              <option key={b} value={b}>
                {b === '' ? 'None' : b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* COLLECTIONS — multi-select checkboxes */}
      <div className={styles.field}>
        <label className={styles.label}>Collections</label>
        <div className={styles.checkboxGrid}>
          {COLLECTIONS.map((c) => {
            const checked = values.collections.includes(c);
            return (
              <label key={c} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFromList('collections', '', c)}
                  className={styles.checkbox}
                />
                <span>{c}</span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}
