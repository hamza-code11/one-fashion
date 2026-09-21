import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image
          src="/Slider-1.webp"
          alt="Hero Banner"
          fill
          priority
          className={styles.heroImage}
        />
      </div>

      {/* Cloud effect */}
      <div className={styles.cloudEffect} />
    </section>
  );
}
