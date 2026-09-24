// components/auth/LoginPage.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import styles from './LoginPage.module.css';

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

type Status = 'idle' | 'submitting' | 'error';

const initialForm: FormState = {
  email: '',
  password: '',
  remember: false,
};

export default function LoginPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'remember' ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email';

    if (!form.password) next.password = 'Password is required';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      // backend lagate waqt yahan fetch call karo
      await new Promise((r) => setTimeout(r, 1000));
      // on success typically redirect to /account
      // router.push('/account');
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* BRAND */}
        <Link href="/" className={styles.brand} aria-label="One + One Fashion">
          <Image
            src="/logo/01.jpeg"
            alt="One + One Fashion"
            width={180}
            height={64}
            priority
          />
        </Link>

        {/* HEADER */}
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Login to your account to view orders and manage your details.
          </p>
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* EMAIL */}
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              autoComplete="email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ''
              }`}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot?
              </Link>
            </div>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={`${styles.input} ${
                  errors.password ? styles.inputError : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className={styles.eyeBtn}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          {/* REMEMBER */}
          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.remember}
                onChange={handleChange('remember')}
                className={styles.checkbox}
              />
              <span>Keep me signed in</span>
            </label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              'Signing in...'
            ) : (
              <>
                Login
                <ArrowRight size={16} strokeWidth={2} />
              </>
            )}
          </button>

          {status === 'error' && (
            <p className={styles.formError}>
              Invalid email or password. Please try again.
            </p>
          )}
        </form>

        {/* FOOTER */}
        <p className={styles.footer}>
          New here?{' '}
          <Link href="/register" className={styles.footerLink}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
