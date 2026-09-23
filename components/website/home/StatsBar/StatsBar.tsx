// components/website/home/StatsBar/StatsBar.tsx
'use client';

import { Users, Package, Star, RotateCcw } from 'lucide-react';
import styles from './StatsBar.module.css';

const stats = [
  {
    id: 1,
    Icon: Users,
    value: '10,000+',
    label: 'Happy Customers',
  },
  {
    id: 2,
    Icon: Package,
    value: '5,000+',
    label: 'Orders Delivered',
  },
  {
    id: 3,
    Icon: Star,
    value: '4.9 / 5',
    label: 'Average Rating',
  },
  {
    id: 4,
    Icon: RotateCcw,
    value: '7 Days',
    label: 'Easy Returns',
  },
];

export default function StatsBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.row}>
          {stats.map(({ id, Icon, value, label }) => (
            <div key={id} className={styles.item}>
              <span className={styles.iconWrap}>
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <div className={styles.text}>
                <span className={styles.value}>{value}</span>
                <span className={styles.label}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

