import React from 'react';
import { Ruler, Shirt, Scale } from 'lucide-react';
import { measurementGuides, sizeChart } from '@/data/sizeGuide';
import { MeasurementGuide } from '@/types/SizeGuide';
import styles from './Sizeguide.module.css';

const ICONS: Record<MeasurementGuide['icon'], React.ElementType> = {
  height: Ruler,
  chest: Shirt,
  weight: Scale,
};

export default function SizeGuide() {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Find The Fit</span>
          <h1 className={styles.title}>Size Guide</h1>
          <p className={styles.description}>
            Measure your little one and match to the right size. If between sizes, we
            recommend sizing up for a longer, more comfortable fit.
          </p>
        </div>

        <div className={styles.guideGrid}>
          {measurementGuides.map((guide) => {
            const Icon = ICONS[guide.icon];
            return (
              <div key={guide.title} className={styles.guideCard}>
                <div className={styles.guideIcon}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className={styles.guideTitle}>{guide.title}</h3>
                <p className={styles.guideDescription}>{guide.description}</p>
              </div>
            );
          })}
        </div>

        <h2 className={styles.chartHeading}>Size Chart</h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Size</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Chest</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size}>
                  <td>{row.size}</td>
                  <td>{row.height}</td>
                  <td>{row.weight}</td>
                  <td>{row.chest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.footnote}>
          All measurements are approximate. For the best fit, measure your child and
          compare to the chart above.
        </p>
      </div>
    </section>
  );
}
