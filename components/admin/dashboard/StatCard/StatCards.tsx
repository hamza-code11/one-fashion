// components/admin/dashboard/StatCards.tsx
import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  Package,
} from 'lucide-react';
import styles from './StatCards.module.css';

interface Stat {
  label: string;
  value: string;
  delta: string;
  deltaType?: 'up' | 'down' | 'neutral';
  Icon: React.ElementType;
}

const STATS: Stat[] = [
  {
    label: 'Total Revenue',
    value: 'PKR 1,248,900',
    delta: '+12.4%',
    deltaType: 'up',
    Icon: TrendingUp,
  },
  {
    label: 'Orders',
    value: '342',
    delta: '+8.1%',
    deltaType: 'up',
    Icon: ShoppingBag,
  },
  {
    label: 'Customers',
    value: '1,120',
    delta: '+4.6%',
    deltaType: 'up',
    Icon: Users,
  },
  {
    label: 'Products',
    value: '86',
    delta: '+2 new',
    deltaType: 'up',
    Icon: Package,
  },
];

export default function StatCards() {
  return (
    <section className={styles.grid} aria-label="Store statistics">
      {STATS.map(({ label, value, delta, deltaType = 'up', Icon }) => (
        <article key={label} className={styles.card}>
          {/* TOP ROW — label + icon */}
          <div className={styles.top}>
            <span className={styles.label}>{label}</span>
            <span className={styles.iconWrap}>
              <Icon size={16} strokeWidth={1.8} />
            </span>
          </div>

          {/* VALUE */}
          <span className={styles.value}>{value}</span>

          {/* DELTA */}
          <span
            className={`${styles.delta} ${styles[`delta_${deltaType}`]}`}
          >
            {deltaType === 'up' && <TrendingUp size={12} strokeWidth={2.2} />}
            {deltaType === 'down' && <TrendingDown size={12} strokeWidth={2.2} />}
            {delta}
          </span>
        </article>
      ))}
    </section>
  );
}
