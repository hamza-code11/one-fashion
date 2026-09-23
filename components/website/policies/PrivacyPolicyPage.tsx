// components/website/policies/PrivacyPolicyPage.tsx
import React from 'react';
import Link from 'next/link';
import { privacyPolicyData } from '@/data/privacyPolicy';
import styles from './PolicyPage.module.css';

export default function PrivacyPolicyPage() {
  const { eyebrow, heading, lastUpdated, intro, sections, contactEmail } =
    privacyPolicyData;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER — full width */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.heading}>{heading}</h1>
          <span className={styles.lastUpdated}>Last updated: {lastUpdated}</span>
          <p className={styles.intro}>{intro}</p>
        </header>

        {/* BODY — sidebar + content */}
        <div className={styles.layout}>
          {/* LEFT — sticky Table of Contents */}
          <aside className={styles.sidebar}>
            <nav className={styles.toc} aria-label="Sections">
              <h2 className={styles.tocTitle}>On this page</h2>
              <ul className={styles.tocList}>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className={styles.tocLink}>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* RIGHT — content */}
          <div className={styles.content}>
            <div className={styles.sections}>
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={styles.section}
                >
                  <h2 className={styles.sectionHeading}>{section.heading}</h2>

                  {section.paragraphs.map((p, i) => (
                    <p key={i} className={styles.paragraph}>
                      {p}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className={styles.bullets}>
                      {section.bullets.map((b, i) => (
                        <li key={i} className={styles.bullet}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* FOOTER CTA */}
            <div className={styles.footerCard}>
              <p className={styles.footerText}>
                Still have questions about your data?
              </p>
              <Link href="/contact" className={styles.footerBtn}>
                Contact Us
              </Link>
              <span className={styles.footerEmail}>{contactEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
