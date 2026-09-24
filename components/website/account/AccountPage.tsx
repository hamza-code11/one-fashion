// components/website/account/AccountPage.tsx
'use client';

import React, { useState } from 'react';
import { UserRound, Package, LogOut, Check } from 'lucide-react';
import { accountData } from '@/data/account';
import styles from './AccountPage.module.css';

type Tab = 'profile' | 'orders';

const TAB_ICONS: Record<Tab, React.ElementType> = {
  profile: UserRound,
  orders: Package,
};

export default function AccountPage() {
  const { title, user, tabs, profileHeading, labels } = accountData;

  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const initials =
    `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (status === 'saved') setStatus('idle');
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      await new Promise((r) => setTimeout(r, 900));
      // backend lagate waqt yahan fetch call karo
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('idle');
    }
  };

  const handleLogout = () => {
    // hook up your auth signOut here
    console.log('Logout clicked');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* PAGE TITLE */}
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.layout}>
          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            {/* USER CARD */}
            <div className={styles.userCard}>
              <span className={styles.avatar}>{initials}</span>
              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {user.firstName} {user.lastName.charAt(0)}.
                </span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            </div>

            {/* TABS */}
            <nav className={styles.tabs} aria-label="Account sections">
              {tabs.map((tab) => {
                const Icon = TAB_ICONS[tab.id];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tab} ${
                      isActive ? styles.tabActive : ''
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                className={`${styles.tab} ${styles.logoutBtn}`}
              >
                <LogOut size={18} strokeWidth={1.8} />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* CONTENT */}
          <div className={styles.content}>
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.sectionHeading}>{profileHeading}</h2>

                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label htmlFor="firstName" className={styles.label}>
                      {labels.firstName}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange('firstName')}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="lastName" className={styles.label}>
                      {labels.lastName}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange('lastName')}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      {labels.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>
                      {labels.phone}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className={styles.input}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={status === 'saving'}
                >
                  {status === 'saving'
                    ? labels.saving
                    : status === 'saved'
                    ? (
                      <>
                        <Check size={16} strokeWidth={2.4} />
                        {labels.saved}
                      </>
                    )
                    : labels.save}
                </button>
              </form>
            )}

            {activeTab === 'orders' && (
              <div className={styles.emptyPanel}>
                <Package size={32} strokeWidth={1.5} />
                <p>No orders yet. When you place your first order, it will show up here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

