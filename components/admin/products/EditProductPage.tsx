// components/admin/products/EditProductPage.tsx
'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Type,
  Link2,
  Layers,
  FolderTree,
  Image as ImageIcon,
  Upload,
  Loader2,
  Check,
  X,
  Trash2,
  Plus,
  DollarSign,
  Package,
  Ruler,
  Save,
} from 'lucide-react';
import { Product } from '@/types/Product';
import { sizeChart } from '@/data/sizeGuide';
import styles from './ProductForm.module.css';

interface Props {
  product: Product;
}

type Status = 'idle' | 'saving' | 'saved' | 'error';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 10;

const GENDERS = ['Girls', 'Boys', 'Baby'];
const COLLECTIONS = [
  'New Arrivals',
  'Winter Edit',
  'Summer Breeze',
  'Everyday Basics',
  'Festive Favourites',
  'Baby First',
  'Girls Party',
  'Boys Denim',
];
const BRANDS = [
  'One + One Fashion',
  'Little Threads',
  'Bloom & Co.',
  'Denim Kids',
  'Tiny Explorer',
];
const CATEGORIES = [
  'Frocks & Dresses',
  'Co-ord Sets',
  'Jackets & Cardigans',
  'T-Shirts & Polos',
  'Pants & Bottoms',
  'Bodysuits & Rompers',
];

const AVAILABLE_SIZES = sizeChart.map((row) => row.size);

interface GalleryImage {
  id: string;
  file?: File;          // undefined for existing server images
  preview: string;      // URL (existing) or blob URL (new)
  isNew: boolean;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function EditProductPage({ product }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* -------- main state (initialized from product) -------- */
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [oldPrice, setOldPrice] = useState(
    product.oldPrice ? String(product.oldPrice) : ''
  );
  const [badge, setBadge] = useState(product.badge ?? '');
  const [gender, setGender] = useState(product.gender);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand ?? 'One + One Fashion');
  const [description, setDescription] = useState(product.description ?? '');
  const [sizes, setSizes] = useState<string[]>(product.sizes ?? []);
  const [colors, setColors] = useState<{ name: string; value: string }[]>(
    product.colors ?? []
  );
  const [collections, setCollections] = useState<string[]>(
    (product as any).collections ?? []
  );

  /* -------- helper inputs -------- */
  const [sizeToAdd, setSizeToAdd] = useState('');
  const [colorName, setColorName] = useState('');
  const [colorValue, setColorValue] = useState('#000000');

  /* -------- gallery — seed from existing product images -------- */
  const [images, setImages] = useState<GalleryImage[]>(() => {
    const existing =
      product.images && product.images.length > 0
        ? product.images
        : [product.image];

    return existing.map((src) => ({
      id: uid(),
      preview: src,
      isNew: false,
    }));
  });
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  /* -------- validation + status -------- */
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<Status>('idle');

  const slug = useMemo(() => slugify(name), [name]);
  const onSale = !!oldPrice && Number(oldPrice) > Number(price);

  const sizeOptions = useMemo(
    () => AVAILABLE_SIZES.filter((s) => !sizes.includes(s)),
    [sizes]
  );

  /* -------- sizes -------- */
  const addSize = (value: string) => {
    const v = value.trim();
    if (!v || sizes.includes(v)) return;
    setSizes((prev) => [...prev, v]);
    setSizeToAdd('');
  };
  const removeSize = (s: string) =>
    setSizes((prev) => prev.filter((x) => x !== s));

  /* -------- colors -------- */
  const addColor = () => {
    const n = colorName.trim();
    if (!n) return;
    if (colors.some((c) => c.name.toLowerCase() === n.toLowerCase())) return;
    setColors((c) => [...c, { name: n, value: colorValue }]);
    setColorName('');
    setColorValue('#000000');
  };
  const removeColor = (n: string) =>
    setColors((prev) => prev.filter((c) => c.name !== n));

  /* -------- collections -------- */
  const toggleCollection = (c: string) =>
    setCollections((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  /* -------- image handlers -------- */
  const handleFilePick = () => fileInputRef.current?.click();

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const next: GalleryImage[] = [];

    for (const file of incoming) {
      if (images.length + next.length >= MAX_IMAGES) break;
      if (!file.type.startsWith('image/')) continue;
      if (file.size > MAX_FILE_SIZE) continue;
      next.push({
        id: uid(),
        file,
        preview: URL.createObjectURL(file),
        isNew: true,
      });
    }

    if (next.length === 0 && incoming.length > 0) {
      alert(
        'Some files were skipped (only images, max 5 MB each, ' +
          MAX_IMAGES +
          ' total).'
      );
    }

    setImages((prev) => [...prev, ...next]);
    if (errors.image) setErrors((e) => ({ ...e, image: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        if (target.isNew && target.file) {
          URL.revokeObjectURL(target.preview);
        } else {
          // remember server-side image so backend can delete it
          setRemovedImages((r) => [...r, target.preview]);
        }
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  /* -------- validate -------- */
  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Product title is required';
    if (!price || Number(price) <= 0) next.price = 'Enter a valid price';
    if (!brand) next.brand = 'Brand is required';
    if (!category) next.category = 'Category is required';
    if (!description.trim()) next.description = 'Description is required';
    if (images.length === 0) next.image = 'Please upload at least one image';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* -------- submit -------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('saving');
    try {
      // Backend:
      // const data = new FormData();
      // data.append('name', name);
      // data.append('slug', slug);
      // data.append('price', price);
      // data.append('oldPrice', oldPrice);
      // data.append('badge', badge);
      // data.append('gender', gender);
      // data.append('category', category);
      // data.append('brand', brand);
      // data.append('description', description);
      // data.append('sizes', JSON.stringify(sizes));
      // data.append('colors', JSON.stringify(colors));
      // data.append('collections', JSON.stringify(collections));
      // data.append('removedImages', JSON.stringify(removedImages));
      // images.forEach((img) => {
      //   if (img.isNew && img.file) data.append('images', img.file);
      // });
      // await fetch(`/api/admin/products/${product.id}`, {
      //   method: 'PUT',
      //   body: data,
      // });

      await new Promise((r) => setTimeout(r, 900));
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/products" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Products
          </Link>
          <h2 className={styles.title}>Edit Product</h2>
          <p className={styles.subtitle}>
            Update the details for &ldquo;{product.name}&rdquo;.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.layout} noValidate>
        {/* LEFT */}
        <div className={styles.leftCol}>
          {/* PRODUCT CONTENT */}
          <section className={styles.card}>
            <header className={styles.cardHead}>
              <Type size={15} strokeWidth={1.9} />
              <h3 className={styles.cardTitle}>Product Content</h3>
            </header>

            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Product Title <span className={styles.req}>*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name)
                    setErrors((er) => ({ ...er, name: undefined }));
                }}
                placeholder="e.g. Floral Cotton Frock"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <Link2 size={13} strokeWidth={2} className={styles.labelIcon} />
                Permalink <span className={styles.req}>*</span>
              </label>
              <div className={styles.slugBox} aria-readonly="true">
                {/* <span className={styles.slugPrefix}>/product/</span> */}
                <code className={styles.slugValue}>
                  {slug || 'your-product-slug'}
                </code>
              </div>
              <span className={styles.hint}>
                Auto-generated from the product title.
              </span>
            </div>

            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>
                Short Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((er) => ({ ...er, description: undefined }));
                }}
                rows={3}
                maxLength={255}
                placeholder="Brief summary for product cards (max 255 characters)"
                className={`${styles.textarea} ${
                  errors.description ? styles.inputError : ''
                }`}
              />
              <div className={styles.rowBetween}>
                {errors.description ? (
                  <span className={styles.errorText}>{errors.description}</span>
                ) : (
                  <span />
                )}
                <span className={styles.hint}>{description.length}/255</span>
              </div>
            </div>
          </section>

          {/* PRODUCT GALLERY */}
          <section className={styles.card}>
            <header className={styles.cardHead}>
              <ImageIcon size={15} strokeWidth={1.9} />
              <h3 className={styles.cardTitle}>Product Gallery</h3>
              <span className={styles.cardHeadRight}>
                {images.length}/{MAX_IMAGES} images
              </span>
            </header>

            <div className={styles.galleryGrid}>
              {images.map((img, idx) => (
                <div key={img.id} className={styles.galleryTile}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.preview}
                    alt={`Product ${idx + 1}`}
                    className={styles.galleryPreview}
                  />
                  {idx === 0 && (
                    <span className={styles.primaryBadge}>Primary</span>
                  )}
                  <button
                    type="button"
                    className={styles.galleryRemove}
                    onClick={() => removeImage(img.id)}
                    aria-label="Remove image"
                  >
                    <Trash2 size={13} strokeWidth={2} />
                  </button>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <button
                  type="button"
                  className={`${styles.galleryAddTile} ${
                    errors.image ? styles.galleryUploadError : ''
                  }`}
                  onClick={handleFilePick}
                >
                  <Upload size={20} strokeWidth={1.6} />
                  <span className={styles.galleryAddTitle}>Add Image</span>
                  <span className={styles.galleryAddHint}>JPG, PNG, WEBP</span>
                </button>
              )}
            </div>

            {errors.image && (
              <span className={styles.errorText}>{errors.image}</span>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className={styles.fileInput}
              onChange={handleFileChange}
            />

            <p className={styles.hint}>
              Upload up to {MAX_IMAGES} images. First image is the primary.
            </p>
          </section>

          {/* VARIANTS */}
          <section className={styles.card}>
            <header className={styles.cardHead}>
              <Layers size={15} strokeWidth={1.9} />
              <h3 className={styles.cardTitle}>Variants</h3>
            </header>

            {/* SIZES */}
            <div className={styles.field}>
              <label htmlFor="sizeSelect" className={styles.label}>
                <Ruler size={13} strokeWidth={2} className={styles.labelIcon} />
                Sizes
              </label>

              <div className={styles.inlineRow}>
                <select
                  id="sizeSelect"
                  value={sizeToAdd}
                  onChange={(e) => {
                    setSizeToAdd(e.target.value);
                    if (e.target.value) addSize(e.target.value);
                  }}
                  disabled={sizeOptions.length === 0}
                  className={styles.select}
                >
                  <option value="">
                    {sizeOptions.length === 0
                      ? 'All sizes added'
                      : 'Select size…'}
                  </option>
                  {sizeOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {sizes.length > 0 && (
                <div className={styles.tags}>
                  {sizes.map((s) => (
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

              <span className={styles.hint}>
                Sizes are pulled from your size chart. Pick from the dropdown.
              </span>
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

              {colors.length > 0 && (
                <div className={styles.swatchGrid}>
                  {colors.map((c) => (
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
          </section>
        </div>

        {/* RIGHT */}
        <aside className={styles.rightCol}>
          {/* PRICING */}
          <section className={styles.card}>
            <header className={styles.cardHead}>
              <DollarSign size={15} strokeWidth={1.9} />
              <h3 className={styles.cardTitle}>Pricing</h3>
              <span
                className={`${styles.onSaleBadge} ${
                  onSale ? styles.onSaleActive : ''
                }`}
              >
                On Sale
              </span>
            </header>

            <div className={styles.field}>
              <label htmlFor="price" className={styles.label}>
                Regular Price (PKR) <span className={styles.req}>*</span>
              </label>
              <input
                id="price"
                type="number"
                min={0}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price)
                    setErrors((er) => ({ ...er, price: undefined }));
                }}
                placeholder="0"
                className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
              />
              {errors.price && (
                <span className={styles.errorText}>{errors.price}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="oldPrice" className={styles.label}>
                Sale Price (optional)
              </label>
              <input
                id="oldPrice"
                type="number"
                min={0}
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="0"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="badge" className={styles.label}>
                Badge / Tag
              </label>
              <input
                id="badge"
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. New Arrival, Best Seller"
                maxLength={20}
                className={styles.input}
              />
              <span className={styles.hint}>
                Short label shown on the product card (max 20 chars).
              </span>
            </div>
          </section>

          {/* ORGANIZE */}
          <section className={styles.card}>
            <header className={styles.cardHead}>
              <FolderTree size={15} strokeWidth={1.9} />
              <h3 className={styles.cardTitle}>Organize</h3>
            </header>

            <div className={styles.field}>
              <label htmlFor="brand" className={styles.label}>
                Brand <span className={styles.req}>*</span>
              </label>
              <select
                id="brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  if (errors.brand)
                    setErrors((er) => ({ ...er, brand: undefined }));
                }}
                className={`${styles.select} ${errors.brand ? styles.inputError : ''}`}
              >
                <option value="">Select Brand</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <span className={styles.errorText}>{errors.brand}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="category" className={styles.label}>
                Category <span className={styles.req}>*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category)
                    setErrors((er) => ({ ...er, category: undefined }));
                }}
                className={`${styles.select} ${
                  errors.category ? styles.inputError : ''
                }`}
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className={styles.errorText}>{errors.category}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="gender" className={styles.label}>
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* COLLECTIONS */}
          <section className={styles.card}>
            <header className={styles.cardHead}>
              <Package size={15} strokeWidth={1.9} />
              <h3 className={styles.cardTitle}>Collections</h3>
            </header>

            <div className={styles.checkboxGrid2}>
              {COLLECTIONS.map((c) => {
                const checked = collections.includes(c);
                return (
                  <label key={c} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCollection(c)}
                      className={styles.checkbox}
                    />
                    <span>{c}</span>
                  </label>
                );
              })}
            </div>
          </section>
        </aside>

        {/* ACTIONS */}
        <div className={styles.actionsRow}>
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={status === 'saving'}
          >
            {status === 'saving' ? (
              <>
                <Loader2 size={15} strokeWidth={2.2} className={styles.spin} />
                Saving…
              </>
            ) : status === 'saved' ? (
              <>
                <Check size={15} strokeWidth={2.4} />
                Saved
              </>
            ) : (
              <>
                <Save size={15} strokeWidth={2} />
                Save Changes
              </>
            )}
          </button>

          <Link href="/admin/products" className={styles.cancelBtn}>
            <X size={15} strokeWidth={2} />
            Cancel
          </Link>

          {status === 'error' && (
            <span className={styles.formError}>
              Something went wrong. Please try again.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
