// components/website/faq/FaqPage.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '@/data/faq';
import styles from './FaqPage.module.css';

export default function FaqPage() {
  const { eyebrow, heading, description, items } = faqData;

  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.description}>{description}</p>
        </header>

        {/* ACCORDION */}
        <div className={styles.list}>
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon}>
                    {isOpen ? (
                      <Minus size={18} strokeWidth={2} />
                    ) : (
                      <Plus size={18} strokeWidth={2} />
                    )}
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ''}`}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
