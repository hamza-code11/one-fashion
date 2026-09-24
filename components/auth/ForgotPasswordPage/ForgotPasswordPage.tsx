// components/auth/ForgotPasswordPage.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Mail, Lock, KeyRound, Check } from 'lucide-react';
import styles from './ForgotPasswordPage.module.css';

type Step = 'email' | 'otp' | 'password' | 'success';

interface FormState {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

const initialForm: FormState = {
  email: '',
  otp: '',
  password: '',
  confirmPassword: '',
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('email');
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (serverError) setServerError('');
  };

  /* ============================================================
     STEP 1 — EMAIL → SEND OTP
  ============================================================ */

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email';

    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      // Backend:
      // const res = await fetch('/api/auth/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: form.email }),
      // });
      // if (!res.ok) throw new Error();
      await new Promise((r) => setTimeout(r, 900));
      setStep('otp');
    } catch {
      setServerError('Could not send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     STEP 2 — OTP → VERIFY
  ============================================================ */

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.otp.trim()) next.otp = 'OTP is required';
    else if (!/^\d{4,6}$/.test(form.otp.trim()))
      next.otp = 'Enter the 4–6 digit code';

    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      // Backend:
      // const res = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: form.email, otp: form.otp }),
      // });
      // if (!res.ok) throw new Error();
      await new Promise((r) => setTimeout(r, 900));
      setStep('password');
    } catch {
      setServerError('Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     STEP 3 — NEW PASSWORD → CHANGE
  ============================================================ */

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8)
      next.password = 'Password must be at least 8 characters';
    if (form.confirmPassword !== form.password)
      next.confirmPassword = 'Passwords do not match';

    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      // Backend:
      // const res = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: form.email,
      //     otp: form.otp,
      //     password: form.password,
      //   }),
      // });
      // if (!res.ok) throw new Error();
      await new Promise((r) => setTimeout(r, 900));
      setStep('success');
      // redirect to login after 2 seconds
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setServerError('Could not reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

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

        {/* STEP INDICATOR */}
        <div className={styles.steps} aria-hidden="true">
          {(['email', 'otp', 'password'] as Step[]).map((s, i) => {
            const order = ['email', 'otp', 'password'];
            const current = order.indexOf(step);
            const idx = order.indexOf(s);
            const isDone = step === 'success' || idx < current;
            const isActive = idx === current && step !== 'success';
            return (
              <span
                key={s}
                className={`${styles.stepDot} ${isActive ? styles.stepDotActive : ''} ${
                  isDone ? styles.stepDotDone : ''
                }`}
              >
                {isDone ? <Check size={12} strokeWidth={3} /> : i + 1}
              </span>
            );
          })}
        </div>

        {/* =====================================
            STEP 1 — EMAIL
        ===================================== */}
        {step === 'email' && (
          <>
            <header className={styles.header}>
              <span className={styles.iconCircle}>
                <Mail size={20} strokeWidth={1.8} />
              </span>
              <h1 className={styles.title}>Forgot Password?</h1>
              <p className={styles.subtitle}>
                Enter your email and we&apos;ll send you a one-time code to reset
                your password.
              </p>
            </header>

            <form onSubmit={handleSendOtp} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="hamza98.dev@gmail.com"
                  autoComplete="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  autoFocus
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Sending OTP...' : (<>Send OTP <ArrowRight size={16} strokeWidth={2} /></>)}
              </button>

              {serverError && <p className={styles.formError}>{serverError}</p>}
            </form>
          </>
        )}

        {/* =====================================
            STEP 2 — OTP
        ===================================== */}
        {step === 'otp' && (
          <>
            <header className={styles.header}>
              <span className={styles.iconCircle}>
                <KeyRound size={20} strokeWidth={1.8} />
              </span>
              <h1 className={styles.title}>Enter OTP</h1>
              <p className={styles.subtitle}>
                We sent a code to <strong>{form.email}</strong>. Enter it below
                to continue.
              </p>
            </header>

            <form onSubmit={handleVerifyOtp} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="otp" className={styles.label}>
                  One-Time Code
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={form.otp}
                  onChange={(e) => update('otp', e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className={`${styles.input} ${styles.otpInput} ${
                    errors.otp ? styles.inputError : ''
                  }`}
                  autoFocus
                />
                {errors.otp && <span className={styles.errorText}>{errors.otp}</span>}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Verifying...' : (<>Verify OTP <ArrowRight size={16} strokeWidth={2} /></>)}
              </button>

              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => setStep('email')}
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Change email
              </button>

              {serverError && <p className={styles.formError}>{serverError}</p>}
            </form>
          </>
        )}

        {/* =====================================
            STEP 3 — NEW PASSWORD
        ===================================== */}
        {step === 'password' && (
          <>
            <header className={styles.header}>
              <span className={styles.iconCircle}>
                <Lock size={20} strokeWidth={1.8} />
              </span>
              <h1 className={styles.title}>Set New Password</h1>
              <p className={styles.subtitle}>
                Choose a strong password you haven&apos;t used before.
              </p>
            </header>

            <form onSubmit={handleChangePassword} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                  New Password
                </label>
                <div className={styles.passwordWrap}>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                    autoFocus
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="confirm" className={styles.label}>
                  Confirm Password
                </label>
                <div className={styles.passwordWrap}>
                  <input
                    id="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`${styles.input} ${
                      errors.confirmPassword ? styles.inputError : ''
                    }`}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className={styles.errorText}>{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Saving...' : (<>Change Password <ArrowRight size={16} strokeWidth={2} /></>)}
              </button>

              {serverError && <p className={styles.formError}>{serverError}</p>}
            </form>
          </>
        )}

        {/* =====================================
            SUCCESS
        ===================================== */}
        {step === 'success' && (
          <div className={styles.successWrap}>
            <span className={styles.successIcon}>
              <Check size={26} strokeWidth={2.4} />
            </span>
            <h1 className={styles.successTitle}>Password updated</h1>
            <p className={styles.successText}>
              Your password has been changed successfully. Redirecting you to
              login...
            </p>

            <Link href="/login" className={styles.submitBtn}>
              Go to Login Now
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        )}

        {/* FOOTER */}
        {step !== 'success' && (
          <p className={styles.footer}>
            Remember your password?{' '}
            <Link href="/login" className={styles.footerLink}>
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
