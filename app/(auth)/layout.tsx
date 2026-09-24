// app/(auth)/layout.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './AuthLayout.module.css';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.shell}>
      {/* BACK TO HOME — top-left of the whole shell */}
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={16} strokeWidth={2} />
        <span>Back to Home</span>
      </Link>

      {/* LEFT — pure image half */}
      <aside className={styles.imageSide}>
        <Image
          src="/auth/05.jfif"
          alt="Kids wearing one + one FASHION"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          priority
          className={styles.image}
        />
      </aside>

      {/* RIGHT — form half */}
      <main className={styles.formSide}>{children}</main>
    </div>
  );
}