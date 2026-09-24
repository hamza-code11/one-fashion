// components/admin/brands/EditBrandPage.tsx
'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Upload,
  Loader2,
  Check,
  X,
  Trash2,
} from 'lucide-react';
import { Brand } from '@/types/Brand';
import styles from './BrandForm.module.css';

interface EditBrandPageProps {
  brand: Brand;
}

type Status = 'idle' | 'saving' | 'saved' | 'error';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function EditBrandPage({ brand }: EditBrandPageProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(brand.name);
  const [description, setDescription] = useState(brand.description);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(brand.logo);
  const [imageRemoved, setImageRemoved] = useState(false);

  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [status, setStatus] = useState<Status>('idle');

  const slug = useMemo(() => slugify(name), [name]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
    if (status === 'saved') setStatus('idle');
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (errors.description) setErrors((e) => ({ ...e, description: undefined }));
    if (status === 'saved') setStatus('idle');
  };

  const handleFilePick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('Image must be under 5 MB.');
      return;
    }

    setImageFile(file);
    setImageRemoved(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!description.trim()) next.description = 'Description is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('saving');
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/brands" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Brands
          </Link>
          <h2 className={styles.title}>Edit Brand</h2>
          <p className={styles.subtitle}>
            Update the details for &ldquo;{brand.name}&rdquo;.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.card} noValidate>
        <div className={styles.fieldsCol}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Little Threads"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Slug</label>
            <div className={styles.slugBox} aria-readonly="true">
              <code className={styles.slugValue}>
                {slug || 'brand-slug'}
              </code>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={4}
              placeholder="A short description of the brand…"
              className={`${styles.textarea} ${
                errors.description ? styles.inputError : ''
              }`}
            />
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageCardHeader}>
            <ImageIcon size={15} strokeWidth={1.8} />
            <span>Brand Logo</span>
          </div>

          <div className={styles.imagePreviewSquare}>
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt={name || 'Brand logo'}
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.imageEmpty}>
                <Upload size={22} strokeWidth={1.6} />
                <span>No logo selected</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
          />

          <div className={styles.imageActions}>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={handleFilePick}
            >
              <Upload size={15} strokeWidth={1.9} />
              {imagePreview ? 'Replace Logo' : 'Upload Logo'}
            </button>

            {imagePreview && (
              <button
                type="button"
                className={styles.removeImageBtn}
                onClick={handleRemoveImage}
                aria-label="Remove logo"
                title="Remove logo"
              >
                <Trash2 size={15} strokeWidth={1.9} />
              </button>
            )}
          </div>

          <span className={styles.imageHint}>
            JPG, PNG or WEBP · Max 5 MB
          </span>
        </div>

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

          <Link href="/admin/brands" className={styles.cancelBtn}>
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

