// components/admin/AdminSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tags,
  Award,
  Layers,
  ShoppingBag,
  MessageSquare,
  Mail,
  FileText,
  LogOut,
  X,
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavSection {
  section: string;
  items: { label: string; href: string; Icon: React.ElementType }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
    ],
  },
  {
    section: 'Catalog',
    items: [
      { label: 'Products', href: '/admin/products', Icon: Package },
      { label: 'Categories', href: '/admin/categories', Icon: Tags },
      { label: 'Brands', href: '/admin/brands', Icon: Award },
      { label: 'Collections', href: '/admin/collections', Icon: Layers },
    ],
  },
  {
    section: 'Sales',
    items: [
      { label: 'Orders', href: '/admin/orders', Icon: ShoppingBag },
    ],
  },
  {
    section: 'Engagement',
    items: [
      { label: 'Contacts', href: '/admin/contacts', Icon: MessageSquare },
      { label: 'Newsletters', href: '/admin/newsletters', Icon: Mail },
    ],
  },
  {
    section: 'Content',
    items: [
      { label: 'CMS', href: '/admin/cms', Icon: FileText },
    ],
  },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const handleLogout = () => {
    // hook up auth signOut here
    // await signOut(); or fetch('/api/auth/logout')
    router.push('/login');
  };

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      aria-label="Admin navigation"
    >
      {/* BRAND */}
      <div className={styles.brandRow}>
        <Link href="/admin" className={styles.brand} aria-label="Admin home">
          <Image
            src="/logo/01.jpeg"
            alt="One + One Fashion"
            width={140}
            height={48}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* NAV */}
      <nav className={styles.nav}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.section} className={styles.navSection}>
            <span className={styles.sectionLabel}>{section.section}</span>

            <div className={styles.sectionItems}>
              {section.items.map(({ label, href, Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`${styles.navItem} ${
                      active ? styles.navItemActive : ''
                    }`}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className={styles.navIcon}>
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span className={styles.navLabel}>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          <span className={styles.navIcon}>
            <LogOut size={16} strokeWidth={1.8} />
          </span>
          <span className={styles.navLabel}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
