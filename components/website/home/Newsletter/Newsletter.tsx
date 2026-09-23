// components/website/home/Newsletter/Newsletter.tsx
'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import styles from './Newsletter.module.css';

interface NewsletterProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  eyebrow = 'Newsletter',
  heading = 'Join the Family',
  description = 'Be the first to know about new arrivals, exclusive drops, and special offers — straight to your inbox.',
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  successMessage = "You're in! Check your inbox for a welcome gift.",
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    // hook this up to your API / Mailchimp / Klaviyo later
    console.log('Subscribed:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrap}>

          {/* LEFT — TEXT */}
          <div className={styles.textSide}>
            <span className={styles.iconWrap}>
              <Mail size={22} strokeWidth={1.8} />
            </span>

            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          {/* RIGHT — FORM */}
          <div className={styles.formSide}>
            {submitted ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>
                  <Check size={20} strokeWidth={2.4} />
                </span>
                <p className={styles.successText}>{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.inputWrap}>
                  <Mail size={16} strokeWidth={1.8} className={styles.inputIcon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={placeholder}
                    aria-label="Email address"
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.button}>
                  {buttonLabel}
                  <ArrowRight size={16} strokeWidth={2.2} />
                </button>
              </form>
            )}

            {error && <p className={styles.error}>{error}</p>}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
