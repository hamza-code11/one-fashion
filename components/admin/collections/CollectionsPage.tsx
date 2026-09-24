// components/admin/collections/CollectionsPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { collections as allCollections } from '@/data/collections';
import { Collection } from '@/types/Collection';
import Pagination from '@/components/commen/Pagination/Pagination';
import styles from './Collections.module.css';

const PAGE_SIZE = 6;

export default function CollectionsPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    /* =========================================================
       FILTER
    ========================================================= */
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return allCollections;

        return allCollections.filter((c) =>
            [c.name, c.slug, c.description]
                .join(' ')
                .toLowerCase()
                .includes(q)
        );
    }, [query]);

    /* reset page on query change */
    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    /* =========================================================
       PAGINATE
    ========================================================= */
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    /* =========================================================
       HANDLERS
    ========================================================= */
    const handleEdit = (collection: Collection) => {
        router.push(`/admin/collections/${collection.id}/edit`);
    };

    const handleDelete = (collection: Collection) => {
        if (
            typeof window !== 'undefined' &&
            window.confirm(`Delete collection "${collection.name}"?`)
        ) {
            // hook up delete flow here
            console.log('Delete', collection);
        }
    };

    /* =========================================================
       RENDER
    ========================================================= */
    return (
        <div className={styles.page}>
            {/* HEADER */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <h2 className={styles.title}>Collections</h2>
                    <p className={styles.subtitle}>
                        {filtered.length}{' '}
                        {filtered.length === 1 ? 'collection' : 'collections'} in your
                        catalog.
                    </p>
                </div>

                <button type="button" className={styles.addBtn}>
                    <Plus size={16} strokeWidth={2.2} />
                    Add Collection
                </button>
            </header>

            {/* SEARCH BAR */}
            <div className={styles.searchWrap}>
                <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search collections…"
                    aria-label="Search collections"
                    className={styles.searchInput}
                />
            </div>

            {/* TABLE */}
            {pageItems.length === 0 ? (
                <div className={styles.empty}>
                    <p>No collections match your search.</p>
                </div>
            ) : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.colImage}>Image</th>
                                <th>Collection</th>
                                <th className={styles.colSlug}>Slug</th>
                                <th className={styles.colCount}>Products</th>
                                <th className={styles.colActions}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pageItems.map((c) => (
                                <tr key={c.id}>
                                    {/* IMAGE */}
                                    <td className={styles.colImage}>
                                        <div className={styles.thumb}>
                                            <Image
                                                src={c.image}
                                                alt={c.name}
                                                fill
                                                sizes="56px"
                                                className={styles.thumbImg}
                                            />
                                        </div>
                                    </td>

                                    {/* COLLECTION */}
                                    <td>
                                        <div className={styles.collectionCell}>
                                            <span className={styles.collectionName}>{c.name}</span>
                                            <span className={styles.collectionDesc}>
                                                {c.description}
                                            </span>
                                        </div>
                                    </td>

                                    {/* SLUG */}
                                    <td className={styles.colSlug}>
                                        <code className={styles.slug}>{c.slug}</code>
                                    </td>

                                    {/* COUNT */}
                                    <td className={styles.colCount}>
                                        <span className={styles.countBadge}>
                                            {c.productCount}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className={styles.colActions}>
                                        <div className={styles.actions}>
                                            <button
                                                type="button"
                                                className={styles.actionBtn}
                                                onClick={() => handleEdit(c)}
                                                aria-label={`Edit ${c.name}`}
                                                title="Edit"
                                            >
                                                <Pencil size={15} strokeWidth={1.8} />
                                            </button>

                                            <button
                                                type="button"
                                                className={`${styles.actionBtn} ${styles.actionDanger}`}
                                                onClick={() => handleDelete(c)}
                                                aria-label={`Delete ${c.name}`}
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

            {/* PAGINATION */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
