// components/admin/AdminHeader.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, ChevronDown, UserRound, LogOut } from 'lucide-react';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/brands': 'Brands',
  '/admin/collections': 'Collections',
  '/admin/orders': 'Orders',
  '/admin/contacts': 'Contacts',
  '/admin/newsletters': 'Newsletters',
  '/admin/cms': 'CMS',
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // derive current page title
  const title =
    PAGE_TITLES[pathname] ??
    Object.entries(PAGE_TITLES)
      .filter(([k]) => k !== '/admin')
      .find(([k]) => pathname.startsWith(k))?.[1] ??
    'Admin';

  // close on outside click
  useEffect(() => {
    if (!userMenuOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setUserMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    // hook up auth signOut here
    router.push('/login');
  };

  return (
    <header className={styles.topbar}>
      {/* LEFT — menu + title */}
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>

        <h1 className={styles.title}>{title}</h1>
      </div>

      {/* RIGHT — user only */}
      <div className={styles.right}>
        <div className={styles.userWrap} ref={menuRef}>
          <button
            type="button"
            className={styles.userBtn}
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <span className={styles.avatar}>A</span>
            <span className={styles.userName}>Admin</span>
            <ChevronDown
              size={14}
              strokeWidth={2}
              className={`${styles.chevron} ${
                userMenuOpen ? styles.chevronOpen : ''
              }`}
            />
          </button>

          {userMenuOpen && (
            <div className={styles.userMenu} role="menu">
              <div className={styles.userMenuHeader}>
                <span className={styles.userMenuAvatar}>A</span>
                <div className={styles.userMenuInfo}>
                  <span className={styles.userMenuName}>Admin</span>
                  <span className={styles.userMenuEmail}>
                    hamza98.dev@gmail.com
                  </span>
                </div>
              </div>

              <div className={styles.userMenuDivider} />

              <button
                type="button"
                className={styles.userMenuItem}
                role="menuitem"
              >
                <UserRound size={16} strokeWidth={1.8} />
                Profile
              </button>

              <button
                type="button"
                className={`${styles.userMenuItem} ${styles.logoutItem}`}
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={16} strokeWidth={1.8} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}