// components/admin/sizeGuide/SizeGuideAdminPage.tsx
'use client';

import React, { useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Ruler,
  X,
  Check,
  Loader2,
} from 'lucide-react';
import { sizeChart as initialChart } from '@/data/sizeGuide';
import { SizeChartRow } from '@/types/SizeGuide';
import styles from './SizeGuideAdminPage.module.css';

type ModalMode = 'add' | 'edit' | null;

interface RowDraft {
  size: string;
  height: string;
  weight: string;
  chest: string;
}

const emptyDraft: RowDraft = { size: '', height: '', weight: '', chest: '' };

export default function SizeGuideAdminPage() {
  const [rows, setRows] = useState<SizeChartRow[]>(initialChart);
  const [query, setQuery] = useState('');
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<RowDraft>(emptyDraft);
  const [errors, setErrors] = useState<Partial<Record<keyof RowDraft, string>>>({});
  const [saving, setSaving] = useState(false);

  /* -------- filter -------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.size, r.height, r.weight, r.chest]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [rows, query]);

  /* -------- modal helpers -------- */
  const openAdd = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setErrors({});
    setModalMode('add');
  };

  const openEdit = (row: SizeChartRow) => {
    setDraft({
      size: row.size,
      height: row.height,
      weight: row.weight,
      chest: row.chest,
    });
    setEditingId(row.id);
    setErrors({});
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
    setDraft(emptyDraft);
    setErrors({});
  };

  const update = <K extends keyof RowDraft>(field: K, value: RowDraft[K]) => {
    setDraft((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  /* -------- validate -------- */
  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!draft.size.trim()) next.size = 'Size is required';
    if (!draft.height.trim()) next.height = 'Height is required';
    if (!draft.weight.trim()) next.weight = 'Weight is required';
    if (!draft.chest.trim()) next.chest = 'Chest is required';

    // duplicate size check
    const duplicate = rows.some(
      (r) =>
        r.size.toLowerCase() === draft.size.trim().toLowerCase() &&
        r.id !== editingId
    );
    if (duplicate) next.size = 'This size already exists';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* -------- save -------- */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      // Backend:
      // if (modalMode === 'add') POST /api/admin/size-guide
      // else PUT /api/admin/size-guide/{id}
      await new Promise((r) => setTimeout(r, 600));

      if (modalMode === 'add') {
        const nextId =
          rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
        setRows((prev) => [
          ...prev,
          {
            id: nextId,
            size: draft.size.trim(),
            height: draft.height.trim(),
            weight: draft.weight.trim(),
            chest: draft.chest.trim(),
          },
        ]);
      } else if (modalMode === 'edit' && editingId != null) {
        setRows((prev) =>
          prev.map((r) =>
            r.id === editingId
              ? {
                  ...r,
                  size: draft.size.trim(),
                  height: draft.height.trim(),
                  weight: draft.weight.trim(),
                  chest: draft.chest.trim(),
                }
              : r
          )
        );
      }

      closeModal();
    } finally {
      setSaving(false);
    }
  };

  /* -------- delete -------- */
  const handleDelete = (row: SizeChartRow) => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Delete size "${row.size}" from the chart?`)
    ) {
      // Backend: DELETE /api/admin/size-guide/{id}
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Size Guide</h2>
          <p className={styles.subtitle}>
            {rows.length} {rows.length === 1 ? 'size' : 'sizes'} in your chart.
          </p>
        </div>

        <button type="button" className={styles.addBtn} onClick={openAdd}>
          <Plus size={16} strokeWidth={2.2} />
          Add Size
        </button>
      </header>

      {/* SEARCH */}
      <div className={styles.searchWrap}>
        <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by size, height, weight, chest…"
          aria-label="Search sizes"
          className={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No sizes match your search.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Size</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Chest</th>
                <th className={styles.colActions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className={styles.sizeBadge}>{row.size}</span>
                  </td>
                  <td className={styles.cell}>{row.height}</td>
                  <td className={styles.cell}>{row.weight}</td>
                  <td className={styles.cell}>{row.chest}</td>
                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => openEdit(row)}
                        aria-label={`Edit ${row.size}`}
                        title="Edit"
                      >
                        <Pencil size={15} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionDanger}`}
                        onClick={() => handleDelete(row)}
                        aria-label={`Delete ${row.size}`}
                        title="Delete"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {modalMode && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <form onSubmit={handleSave} className={styles.modal} noValidate>
            <header className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <span className={styles.modalIcon}>
                  <Ruler size={16} strokeWidth={1.9} />
                </span>
                <h3 className={styles.modalTitle}>
                  {modalMode === 'add' ? 'Add Size' : 'Edit Size'}
                </h3>
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </header>

            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label htmlFor="size" className={styles.label}>
                  Size <span className={styles.req}>*</span>
                </label>
                <input
                  id="size"
                  type="text"
                  value={draft.size}
                  onChange={(e) => update('size', e.target.value)}
                  placeholder="e.g. 4-5Y"
                  className={`${styles.input} ${
                    errors.size ? styles.inputError : ''
                  }`}
                  autoFocus
                />
                {errors.size && (
                  <span className={styles.errorText}>{errors.size}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="height" className={styles.label}>
                  Height <span className={styles.req}>*</span>
                </label>
                <input
                  id="height"
                  type="text"
                  value={draft.height}
                  onChange={(e) => update('height', e.target.value)}
                  placeholder="e.g. 104–110 cm"
                  className={`${styles.input} ${
                    errors.height ? styles.inputError : ''
                  }`}
                />
                {errors.height && (
                  <span className={styles.errorText}>{errors.height}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="weight" className={styles.label}>
                  Weight <span className={styles.req}>*</span>
                </label>
                <input
                  id="weight"
                  type="text"
                  value={draft.weight}
                  onChange={(e) => update('weight', e.target.value)}
                  placeholder="e.g. 16–18 kg"
                  className={`${styles.input} ${
                    errors.weight ? styles.inputError : ''
                  }`}
                />
                {errors.weight && (
                  <span className={styles.errorText}>{errors.weight}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="chest" className={styles.label}>
                  Chest <span className={styles.req}>*</span>
                </label>
                <input
                  id="chest"
                  type="text"
                  value={draft.chest}
                  onChange={(e) => update('chest', e.target.value)}
                  placeholder="e.g. 58 cm"
                  className={`${styles.input} ${
                    errors.chest ? styles.inputError : ''
                  }`}
                />
                {errors.chest && (
                  <span className={styles.errorText}>{errors.chest}</span>
                )}
              </div>
            </div>

            <footer className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={closeModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={15} strokeWidth={2.2} className={styles.spin} />
                    Saving…
                  </>
                ) : (
                  <>
                    <Check size={15} strokeWidth={2.4} />
                    {modalMode === 'add' ? 'Add Size' : 'Save Changes'}
                  </>
                )}
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}
