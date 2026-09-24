// components/admin/collections/AddCollectionPage.tsx
'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  Upload,
  Loader2,
  Check,
  X,
  Trash2,
} from 'lucide-react';
import styles from './AddCollectionPage.module.css';

type Status = 'idle' | 'saving' | 'saved' | 'error';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/* =========================================================
   Helpers
========================================================= */

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/* =========================================================
   Page
========================================================= */

export default function AddCollectionPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    image?: string;
  }>({});
  const [status, setStatus] = useState<Status>('idle');

  /* -------- derived slug (auto-generated, read-only) -------- */
  const slug = useMemo(() => slugify(name), [name]);

  /* -------- field updaters -------- */
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

  /* -------- image picker -------- */
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
    setImagePreview(URL.createObjectURL(file));
    if (errors.image) setErrors((e) => ({ ...e, image: undefined }));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* -------- validate -------- */
  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!description.trim()) next.description = 'Description is required';
    if (!imageFile) next.image = 'Please upload a collection image';
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
      // data.append('description', description);
      // if (imageFile) data.append('image', imageFile);
      // await fetch('/api/admin/collections', {
      //   method: 'POST',
      //   body: data,
      // });
      // router.push('/admin/collections');

      await new Promise((r) => setTimeout(r, 900));
      setStatus('saved');
      setTimeout(() => router.push('/admin/collections'), 1200);
    } catch {
      setStatus('error');
    }
  };

  /* -------- render -------- */
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/collections" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Collections
          </Link>
          <h2 className={styles.title}>Add Collection</h2>
          <p className={styles.subtitle}>
            Create a new collection for your catalog.
          </p>
        </div>
      </header>

      {/* FORM */}
      <form onSubmit={handleSubmit} className={styles.card} noValidate>
        {/* LEFT — fields */}
        <div className={styles.fieldsCol}>
          {/* NAME */}
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Winter Edit"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          {/* SLUG — auto, read-only */}
          <div className={styles.field}>
            <label className={styles.label}>Slug</label>
            <div className={styles.slugBox} aria-readonly="true">
              <code className={styles.slugValue}>
                {slug || 'collection-slug'}
              </code>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={4}
              placeholder="A short description of the collection…"
              className={`${styles.textarea} ${
                errors.description ? styles.inputError : ''
              }`}
            />
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>
        </div>

        {/* RIGHT — image uploader */}
        <div className={styles.imageCol}>
          <div className={styles.imageCardHeader}>
            <ImageIcon size={15} strokeWidth={1.8} />
            <span>Collection Image</span>
          </div>

          <div
            className={`${styles.imagePreviewSquare} ${
              errors.image ? styles.imagePreviewError : ''
            }`}
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt={name || 'Collection preview'}
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.imageEmpty}>
                <Upload size={22} strokeWidth={1.6} />
                <span>No image selected</span>
              </div>
            )}
          </div>

          {errors.image && (
            <span className={styles.errorText}>{errors.image}</span>
          )}

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
              {imagePreview ? 'Replace Image' : 'Upload Image'}
            </button>

            {imagePreview && (
              <button
                type="button"
                className={styles.removeImageBtn}
                onClick={handleRemoveImage}
                aria-label="Remove image"
                title="Remove image"
              >
                <Trash2 size={15} strokeWidth={1.9} />
              </button>
            )}
          </div>

          <span className={styles.imageHint}>
            JPG, PNG or WEBP · Max 5 MB
          </span>
        </div>

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
                Creating…
              </>
            ) : status === 'saved' ? (
              <>
                <Check size={15} strokeWidth={2.4} />
                Created
              </>
            ) : (
              <>
                <Plus size={15} strokeWidth={2.2} />
                Create Collection
              </>
            )}
          </button>

          <Link href="/admin/collections" className={styles.cancelBtn}>
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

