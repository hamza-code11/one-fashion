// components/website/layout/Footer/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';

const shopLinks = [
  { label: 'Girls', href: '/shop/girls' },
  { label: 'New Arrivals', href: '/shop/new-arrivals' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/shop/sale' },
];

const helpLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'Size Guide', href: '/size-guide' },
];

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Our Values', href: '/about' },
  { label: 'Quality', href: '/about' },
];

const accountLinks = [
  { label: 'My Account', href: '/account' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Orders', href: '/orders' },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', Icon: FaFacebookF },
  { label: 'YouTube', href: 'https://youtube.com', Icon: FaYoutube },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* TOP GRID */}
        <div className={styles.topGrid}>
          {/* BRAND COLUMN */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoWrap}>
              <Image
                src="/logo/01.jpeg"
                alt="One + One Fashion"
                width={200}
                height={80}
                className={styles.logo}
              />
            </Link>

            <p className={styles.brandText}>
              Modern children&apos;s fashion for little personalities.
              Thoughtfully designed in Pakistan for everyday adventures and
              special moments.
            </p>

            <div className={styles.socials}>
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialBtn}
                >
                  <Icon size={18} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>SHOP</h4>
            <ul className={styles.linkList}>
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>HELP</h4>
            <ul className={styles.linkList}>
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>ABOUT</h4>
            <ul className={styles.linkList}>
              {aboutLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>ACCOUNT</h4>
            <ul className={styles.linkList}>
              {accountLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* BOTTOM ROW */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} one + one FASHION. All rights reserved.
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className={styles.legalLink}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
