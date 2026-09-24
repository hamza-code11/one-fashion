// components/admin/Pagination/Pagination.tsx
'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** how many page numbers to show around current */
  siblings?: number;
  /** show prev/next buttons */
  showArrows?: boolean;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageNumbers(
  current: number,
  total: number,
  siblings: number
): (number | '…')[] {
  const totalNumbers = siblings * 2 + 5; // first + last + current + 2 sib + 2 ellipsis

  if (total <= totalNumbers) return range(1, total);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  const pages: (number | '…')[] = [];

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + siblings * 2);
    pages.push(...leftRange, '…', total);
  } else if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(total - (2 + siblings * 2), total);
    pages.push(1, '…', ...rightRange);
  } else {
    pages.push(
      1,
      '…',
      ...range(leftSibling, rightSibling),
      '…',
      total
    );
  }

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
  showArrows = true,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages, siblings);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {showArrows && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
      )}

      <ul className={styles.list}>
        {pages.map((p, i) =>
          p === '…' ? (
            <li key={`e-${i}`} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`${styles.page} ${
                  p === currentPage ? styles.pageActive : ''
                }`}
                onClick={() => goTo(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                aria-label={`Go to page ${p}`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      {showArrows && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      )}
    </nav>
  );
}
