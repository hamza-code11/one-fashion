import { Truck, Sparkles, Undo2 } from "lucide-react";
import styles from "./TopBar.module.css";

const announcements = [
  { icon: Truck, text: "FREE SHIPPING OVER PKR 10,000" },
  { icon: Sparkles, text: "NEW SEASON — LITTLE LOOKS, BIG PERSONALITY" },
  { icon: Undo2, text: "EASY 7-DAY RETURNS ACROSS PAKISTAN" },
  { icon: Sparkles, text: "CASH ON DELIVERY AVAILABLE" },
];

function AnnouncementGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={ariaHidden}>
      {announcements.map((item, index) => {
        const Icon = item.icon;
        return (
          <div className={styles.item} key={index}>
            <Icon size={13} strokeWidth={1.8} className={styles.icon} />
            <span>{item.text}</span>
            <span className={styles.dot} aria-hidden="true">
              ✦
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className={styles.marquee} role="region" aria-label="Store announcements">
      <div className={styles.track}>
        <AnnouncementGroup />
        <AnnouncementGroup ariaHidden />
      </div>
    </div>
  );
}
