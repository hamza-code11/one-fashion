"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, UserRound, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop", dropdown: ["All Products", "New In", "Sale"] },
  { label: "GIRLS", href: "/shop/girls", dropdown: ["Dresses", "Tops", "Bottoms"] },
  { label: "BOYS", href: "/shop/boys", dropdown: ["T-Shirts", "Shorts", "Jackets"] },
  { label: "BABY", href: "/shop/baby", dropdown: ["Bodysuits", "Sets", "Sleepwear"] },
  { label: "NEW ARRIVALS", href: "/shop/new-arrivals" },
  { label: "COLLECTIONS", href: "/collections" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
                className={`${styles.navLink} ${item.label === "HOME" ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>

              {item.dropdown && (
                <div className={styles.dropdownMenu}>
                  {item.dropdown.map((sub) => (
                    <Link key={sub} href="#" className={styles.dropdownItem}>
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link href="/" className={styles.logo} aria-label="One + One Fashion">
          <Image
            src="/logo/01.jpeg"
            alt="One + One Fashion"
            width={260}
            height={90}
            priority
          />
        </Link>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search">
            <Search size={19} strokeWidth={1.6} />
          </button>

          <button className={styles.iconButton} aria-label="Account">
            <UserRound size={19} strokeWidth={1.6} />
          </button>

          <Link href="/wishlist" className={styles.iconButton} aria-label="Wishlist">
            <Heart size={19} strokeWidth={1.6} />
          </Link>

          <Link href="/cart" className={styles.iconButton} aria-label="Cart">
            <ShoppingBag size={19} strokeWidth={1.6} />
          </Link>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`${styles.mobileLink} ${item.label === "HOME" ? styles.mobileLinkActive : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
