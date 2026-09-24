// components/admin/contacts/ContactsPage.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, Trash2, Mail, Phone, Eye, X } from 'lucide-react';
import Pagination from '@/components/commen/Pagination/Pagination';
import styles from './Contacts.module.css';

/* =========================================================
   TYPES
========================================================= */

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  receivedAt: string; // ISO date
}

/* =========================================================
   MOCK DATA (replace with API later)
========================================================= */

const CONTACTS: ContactMessage[] = [
  {
    id: 1,
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567',
    message:
      'Hi, I wanted to ask about the sizing for the Floral Cotton Frock — my daughter is 4 years old. Would the 4-5Y fit her well?',
    receivedAt: '2026-01-12',
  },
  {
    id: 2,
    name: 'Zain Ali',
    email: 'zain.ali@example.com',
    phone: '+92 321 9876543',
    message:
      'Do you ship to Karachi? I placed an order yesterday but haven’t received confirmation yet.',
    receivedAt: '2026-01-11',
  },
  {
    id: 3,
    name: 'Hira M.',
    email: 'hira.m@example.com',
    phone: '+92 333 4455667',
    message:
      'Loved the packaging on my last order! Just wanted to say thank you and ask if you have gift wrapping available.',
    receivedAt: '2026-01-10',
  },
  {
    id: 4,
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '+92 345 1122334',
    message:
      'Please let me know the return policy for sale items. I bought the Printed Co-ord Set last week.',
    receivedAt: '2026-01-09',
  },
  {
    id: 5,
    name: 'Sara N.',
    email: 'sara.n@example.com',
    phone: '+92 311 7788990',
    message:
      'Can I change the delivery address on my order? It hasn’t shipped yet.',
    receivedAt: '2026-01-08',
  },
  {
    id: 6,
    name: 'Hamza',
    email: 'hamza98.dev@gmail.com',
    phone: '+92 300 5556677',
    message:
      'Hey team, I’d love to know if you plan to launch a newborn collection soon.',
    receivedAt: '2026-01-07',
  },
  {
    id: 7,
    name: 'Maryam T.',
    email: 'maryam.t@example.com',
    phone: '+92 322 9988776',
    message:
      'Could you send me the fabric composition for the Knitted Cardigan?',
    receivedAt: '2026-01-06',
  },
  {
    id: 8,
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    phone: '+92 336 2233445',
    message:
      'Placing a bulk order for a school event — 15 pieces. Can you share wholesale pricing?',
    receivedAt: '2026-01-05',
  },
  {
    id: 9,
    name: 'Noor F.',
    email: 'noor.f@example.com',
    phone: '+92 315 6677889',
    message:
      'The zipper on my Corduroy Pants got stuck after the first wash. Can you help?',
    receivedAt: '2026-01-04',
  },
  {
    id: 10,
    name: 'Hassan K.',
    email: 'hassan.k@example.com',
    phone: '+92 302 4455661',
    message:
      'I need to update my phone number on file. Please guide me.',
    receivedAt: '2026-01-03',
  },
];

const PAGE_SIZE = 8;

/* =========================================================
   HELPERS
========================================================= */

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function truncate(text: string, length = 60) {
  return text.length > length ? text.slice(0, length).trim() + '…' : text;
}

/* =========================================================
   PAGE
========================================================= */

export default function ContactsPage() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  /* -------- filter -------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CONTACTS;
    return CONTACTS.filter((c) =>
      [c.name, c.email, c.phone, c.message]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  /* reset page on query change */
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  /* -------- paginate -------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  /* -------- actions -------- */
  const handleDelete = (name: string) => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Delete message from "${name}"?`)
    ) {
      // hook up delete flow here
      console.log('Delete', name);
    }
  };

  /* close modal on Escape */
  useEffect(() => {
    if (!selected) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);

    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  /* -------- render -------- */
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Contacts</h2>
          <p className={styles.subtitle}>
            {filtered.length}{' '}
            {filtered.length === 1 ? 'message' : 'messages'} received from
            customers.
          </p>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} strokeWidth={1.8} className={styles.searchIcon} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone…"
            aria-label="Search contacts"
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE */}
      {pageItems.length === 0 ? (
        <div className={styles.empty}>
          <p>No messages match your search.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th className={styles.colEmail}>Email</th>
                <th className={styles.colPhone}>Phone</th>
                <th className={styles.colMessage}>Message</th>
                <th className={styles.colDate}>Received</th>
                <th className={styles.colActions}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className={styles.nameText}>{c.name}</span>
                  </td>

                  <td className={styles.colEmail}>
                    <span className={styles.mutedText}>{c.email}</span>
                  </td>

                  <td className={styles.colPhone}>
                    <span className={styles.mutedText}>{c.phone}</span>
                  </td>

                  <td className={styles.colMessage}>
                    <span className={styles.messageText}>
                      {truncate(c.message, 60)}
                    </span>
                  </td>

                  <td className={styles.colDate}>
                    {formatDate(c.receivedAt)}
                  </td>

                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => setSelected(c)}
                        aria-label={`View message from ${c.name}`}
                        title="View message"
                      >
                        <Eye size={15} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionDanger}`}
                        onClick={() => handleDelete(c.name)}
                        aria-label={`Delete message from ${c.name}`}
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

      {/* MESSAGE MODAL */}
      {selected && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className={styles.modal}>
            {/* MODAL HEADER */}
            <header className={styles.modalHeader}>
              <div className={styles.modalHeaderText}>
                <h3 id="contact-modal-title" className={styles.modalTitle}>
                  {selected.name}
                </h3>
                <span className={styles.modalDate}>
                  {formatDate(selected.receivedAt)}
                </span>
              </div>

              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </header>

            {/* META */}
            <div className={styles.modalMeta}>
              <a
                href={`mailto:${selected.email}`}
                className={styles.modalMetaItem}
              >
                <Mail size={14} strokeWidth={1.8} />
                <span>{selected.email}</span>
              </a>

              <a
                href={`tel:${selected.phone.replace(/\s+/g, '')}`}
                className={styles.modalMetaItem}
              >
                <Phone size={14} strokeWidth={1.8} />
                <span>{selected.phone}</span>
              </a>
            </div>

            {/* MESSAGE BODY */}
            <div className={styles.modalBody}>
              <p>{selected.message}</p>
            </div>

            {/* MODAL ACTIONS */}
            <div className={styles.modalActions}>
              {/* <a
                href={`mailto:${selected.email}?subject=Re:%20Your%20message%20to%20One%20%2B%20One`}
                className={styles.replyBtn}
              >
                <Mail size={15} strokeWidth={1.9} />
                Reply via Email
              </a> */}

              <button
                type="button"
                className={`${styles.deleteBtn}`}
                onClick={() => {
                  handleDelete(selected.name);
                  setSelected(null);
                }}
              >
                <Trash2 size={15} strokeWidth={1.8} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
