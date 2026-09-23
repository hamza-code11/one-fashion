// data/terms.ts

import { PolicyData } from '@/types/Policy';

export const termsData: PolicyData = {
  eyebrow: 'Legal',
  heading: 'Terms & Conditions',
  lastUpdated: 'January 2026',
  intro:
    'Welcome to one + one FASHION. By browsing our website or placing an order, you agree to the terms below. We have written them in plain language so they are easy to understand.',
  sections: [
    {
      id: 'acceptance',
      heading: '1. Acceptance of Terms',
      paragraphs: [
        'By accessing or using the one + one FASHION website, you confirm that you are at least 18 years old and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.',
      ],
    },
    {
      id: 'account',
      heading: '2. Your Account',
      paragraphs: [
        'To place an order you may create an account. You are responsible for keeping your account details secure and for all activity that occurs under your account.',
      ],
      bullets: [
        'Provide accurate, current, and complete information during registration.',
        'Do not share your password with anyone.',
        'Notify us immediately if you suspect unauthorised access to your account.',
      ],
    },
    {
      id: 'products',
      heading: '3. Products & Availability',
      paragraphs: [
        'We make every effort to display our products as accurately as possible. However, colours and finishes may appear slightly different depending on your screen.',
        'All products are subject to availability. If an item becomes unavailable after you place an order, we will notify you and offer a full refund or an alternative.',
      ],
    },
    {
      id: 'pricing',
      heading: '4. Pricing & Payment',
      paragraphs: [
        'All prices are listed in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice.',
      ],
      bullets: [
        'We accept major debit and credit cards, bank transfer, and Cash on Delivery.',
        'For Cash on Delivery, please have the exact amount ready at the time of delivery.',
        'We reserve the right to cancel an order if payment verification fails.',
      ],
    },
    {
      id: 'shipping',
      heading: '5. Shipping & Delivery',
      paragraphs: [
        'Orders are dispatched within 24–48 hours on working days. Delivery timelines vary by location and are estimates only — we are not liable for delays caused by courier partners or events outside our control.',
      ],
      bullets: [
        'Standard delivery across Pakistan: 2–4 working days.',
        'Remote areas may take an additional 1–2 days.',
        'A tracking link is sent via SMS and email once your order is dispatched.',
      ],
    },
    {
      id: 'returns',
      heading: '6. Returns & Exchanges',
      paragraphs: [
        'We offer 7-day returns on unworn items with original tags attached. To be eligible for a return, items must be in the same condition in which you received them.',
      ],
      bullets: [
        'Sale items and personalised items are not eligible for return.',
        'Return shipping is free within Pakistan.',
        'Refunds are processed within 5–7 working days of receiving the returned item.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: '7. Intellectual Property',
      paragraphs: [
        'All content on this website — including text, images, logos, and design — is the property of one + one FASHION and protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our written permission.',
      ],
    },
    {
      id: 'user-conduct',
      heading: '8. User Conduct',
      paragraphs: [
        'You agree not to misuse our website. Prohibited activities include:',
      ],
      bullets: [
        'Attempting to gain unauthorised access to our systems.',
        'Posting false, misleading, or offensive content.',
        'Using the site for fraudulent or illegal purposes.',
        'Interfering with the security or functionality of the site.',
      ],
    },
    {
      id: 'liability',
      heading: '9. Limitation of Liability',
      paragraphs: [
        'one + one FASHION is not liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability is limited to the amount you paid for the product in question.',
      ],
    },
    {
      id: 'governing-law',
      heading: '10. Governing Law',
      paragraphs: [
        'These Terms & Conditions are governed by the laws of the Islamic Republic of Pakistan. Any disputes will be subject to the exclusive jurisdiction of the courts of Lahore.',
      ],
    },
    {
      id: 'changes',
      heading: '11. Changes to These Terms',
      paragraphs: [
        'We may update these terms from time to time to reflect changes in our practices or legal requirements. The "Last updated" date at the top of this page indicates the latest version. Continued use of our website means you accept the updated terms.',
      ],
    },
    {
      id: 'contact',
      heading: '12. Contact Us',
      paragraphs: [
        'If you have any questions about these Terms & Conditions, please reach out:',
        'Email: hello@oneplusonefashion.pk',
        'Studio: DHA Phase 5, Lahore, Pakistan',
      ],
    },
  ],
  contactEmail: 'hello@oneplusonefashion.pk',
};
