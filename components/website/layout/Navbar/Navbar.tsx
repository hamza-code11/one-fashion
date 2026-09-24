// components/website/layout/Navbar/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, UserRound, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SHOP', href: '/product' },
  { label: 'NEW ARRIVALS', href: '/new-arrivals' },
  { label: 'COLLECTIONS', href: '/collections' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = totalItems;
  const wishlistCount = wishlist.length;

  // Simple active check — matches pathname only, no query params
  const isItemActive = (href: string) => pathname === href;

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <button
          className={`${styles.iconButton} ${styles.menuToggle}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
        </button>

        <nav className={styles.navLinks} aria-label="Primary">
          {navItems.map((item) => (
            <div key={item.label} className={styles.navItem}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${isItemActive(item.href) ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <Link href="/" className={styles.logo} aria-label="One + One Fashion">
          <Image src="/logo/01.jpeg" alt="One + One Fashion" width={260} height={90} priority />
        </Link>

        <div className={styles.actions}>
          {/* <Link
            href="/search"
            className={styles.iconButton}
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.6} />
          </Link> */}

          <Link
            href="/account"
            className={styles.iconButton}
            aria-label="Account"
          >
            <UserRound size={19} strokeWidth={1.6} />
          </Link>
          <Link
            href="/wishlist"
            className={styles.iconButton}
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart size={19} strokeWidth={1.6} />
            {wishlistCount > 0 && (
              <span className={styles.badge}>{wishlistCount}</span>
            )}
          </Link>

          <Link
            href="/cart"
            className={styles.iconButton}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`${styles.mobileLink} ${isItemActive(item.href) ? styles.mobileLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
