// components/auth/RegisterPage.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import styles from './RegisterPage.module.css';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agree: false,
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'agree' ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.firstName.trim()) next.firstName = 'First name is required';
    if (!form.lastName.trim()) next.lastName = 'Last name is required';

    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email';

    if (!form.phone.trim()) next.phone = 'Phone number is required';

    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8)
      next.password = 'Password must be at least 8 characters';

    if (form.confirmPassword !== form.password)
      next.confirmPassword = 'Passwords do not match';

    if (!form.agree) next.agree = 'You must accept the terms to continue';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      // backend lagate waqt yahan fetch call karo
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successWrap}>
            <span className={styles.successIcon}>
              <Check size={26} strokeWidth={2.4} />
            </span>
            <h1 className={styles.successTitle}>Welcome to the family!</h1>
            <p className={styles.successText}>
              Your account has been created. We&apos;ve sent a confirmation
              link to <strong>{form.email}</strong>.
            </p>
            <Link href="/login" className={styles.submitBtn}>
              Continue to Login
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* BRAND / LOGO */}
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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>
            Join one + one FASHION and be the first to know about new drops.
          </p>
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.grid}>
            {/* FIRST NAME */}
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange('firstName')}
                placeholder="Ayesha"
                autoComplete="given-name"
                className={`${styles.input} ${
                  errors.firstName ? styles.inputError : ''
                }`}
              />
              {errors.firstName && (
                <span className={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            {/* LAST NAME */}
            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange('lastName')}
                placeholder="Khan"
                autoComplete="family-name"
                className={`${styles.input} ${
                  errors.lastName ? styles.inputError : ''
                }`}
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>
          </div>

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

          {/* PHONE */}
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="+92 300 1234567"
              autoComplete="tel"
              className={`${styles.input} ${
                errors.phone ? styles.inputError : ''
              }`}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                placeholder="At least 8 characters"
                autoComplete="new-password"
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

          {/* CONFIRM PASSWORD */}
          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className={`${styles.input} ${
                  errors.confirmPassword ? styles.inputError : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className={styles.eyeBtn}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          {/* TERMS CHECKBOX */}
          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={handleChange('agree')}
                className={styles.checkbox}
              />
              <span>
                I agree to the{' '}
                <Link href="/terms-conditions" className={styles.inlineLink}>
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className={styles.inlineLink}>
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.agree && (
              <span className={styles.errorText}>{errors.agree}</span>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              'Creating account...'
            ) : (
              <>
                Create Account
                <ArrowRight size={16} strokeWidth={2} />
              </>
            )}
          </button>

          {status === 'error' && (
            <p className={styles.formError}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* FOOTER */}
        <p className={styles.footer}>
          Already have an account?{' '}
          <Link href="/login" className={styles.footerLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
