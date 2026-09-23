// components/website/contact/ContactPage.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { contactData } from '@/data/contact';
import styles from './ContactPage.module.css';

const ICONS = [Mail, Phone, MapPin, Clock];

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const { info, formLabels } = contactData;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name required';
    if (!form.email.trim()) next.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Invalid email';
    if (!form.message.trim()) next.message = 'Message required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      // backend lagate waqt yahan fetch call karo
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>{info.eyebrow}</span>
          <h1 className={styles.heading}>{info.heading}</h1>
          <p className={styles.description}>{info.description}</p>
        </header>

        {/* LAYOUT */}
        <div className={styles.layout}>
          {/* LEFT — info cards */}
          <aside className={styles.infoCol}>
            {info.cards.map((card, i) => {
              const Icon = ICONS[i] ?? Mail;
              return (
                <div key={card.id} className={styles.infoCard}>
                  <span className={styles.infoIcon}>
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <div className={styles.infoText}>
                    <span className={styles.infoTitle}>{card.title}</span>
                    <span className={styles.infoValue}>{card.value}</span>
                    <span className={styles.infoNote}>{card.note}</span>
                  </div>
                </div>
              );
            })}
          </aside>

          {/* RIGHT — form */}
          <div className={styles.formCol}>
            {status === 'success' ? (
              <div className={styles.successCard}>
                <span className={styles.successIcon}>
                  <Check size={22} strokeWidth={2.4} />
                </span>
                <p className={styles.successText}>{formLabels.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* NAME */}
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    {formLabels.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Your name"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                {/* EMAIL */}
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    {formLabels.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                {/* PHONE */}
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    {formLabels.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="+92 300 1234567"
                    className={styles.input}
                  />
                </div>

                {/* MESSAGE */}
                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    {formLabels.message}
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="How can we help?"
                    rows={5}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  />
                  {errors.message && (
                    <span className={styles.errorText}>{errors.message}</span>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    formLabels.submitting
                  ) : (
                    <>
                      {formLabels.submit}
                      <Send size={16} strokeWidth={2} />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className={styles.formError}>{formLabels.error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
