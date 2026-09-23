// data/privacyPolicy.ts

import { PolicyData } from '@/types/Policy';

export const privacyPolicyData: PolicyData = {
  eyebrow: 'Legal',
  heading: 'Privacy Policy',
  lastUpdated: 'January 2026',
  intro:
    'At one + one FASHION, your privacy matters. This policy explains what information we collect, how we use it, and the choices you have. We keep it simple and human — no legal jargon walls.',
  sections: [
    {
      id: 'information-we-collect',
      heading: '1. Information We Collect',
      paragraphs: [
        'We collect information you share with us when you place an order, create an account, subscribe to our newsletter, or contact our support team.',
      ],
      bullets: [
        'Contact details — name, email address, phone number, and shipping address.',
        'Order details — products purchased, size, colour, and order value.',
        'Payment information — processed securely by our payment partners. We never store your full card details.',
        'Usage data — pages you visit, device, and browser type, collected via cookies.',
      ],
    },
    {
      id: 'how-we-use',
      heading: '2. How We Use Your Information',
      paragraphs: [
        'We use your information to run our store smoothly and give you a great experience.',
      ],
      bullets: [
        'Process and deliver your orders, and send order updates.',
        'Respond to questions, returns, and support requests.',
        'Send marketing emails — only if you subscribed. You can unsubscribe anytime.',
        'Improve our website, product range, and shopping experience.',
        'Comply with tax, accounting, and legal obligations in Pakistan.',
      ],
    },
    {
      id: 'cookies',
      heading: '3. Cookies & Tracking',
      paragraphs: [
        'We use cookies and similar technologies to keep your cart working, remember your preferences, and understand how our site is used. You can disable cookies in your browser, though some features may not work as expected.',
      ],
    },
    {
      id: 'sharing',
      heading: '4. Sharing Your Information',
      paragraphs: [
        'We do not sell your personal information. We only share it with trusted partners who help us run our store:',
      ],
      bullets: [
        'Delivery partners to ship your order.',
        'Payment processors to complete transactions.',
        'Email and analytics providers to send updates and improve our service.',
        'Government or legal authorities when required by law.',
      ],
    },
    {
      id: 'security',
      heading: '5. Data Security',
      paragraphs: [
        'We use industry-standard security measures including SSL encryption, secure servers, and access controls to protect your information. While no system is 100% secure, we work hard to keep your data safe.',
      ],
    },
    {
      id: 'your-rights',
      heading: '6. Your Rights',
      paragraphs: [
        'You have the right to access, correct, or delete your personal information. You can also opt out of marketing emails at any time.',
        'To exercise any of these rights, email us at hello@oneplusonefashion.pk and we will respond within 7 working days.',
      ],
    },
    {
      id: 'children',
      heading: "7. Children's Privacy",
      paragraphs: [
        'Our store is designed for parents and guardians. We do not knowingly collect personal information from children under 13. If you believe we have, please contact us and we will remove it.',
      ],
    },
    {
      id: 'changes',
      heading: '8. Changes to This Policy',
      paragraphs: [
        'We may update this policy occasionally to reflect new practices or legal requirements. The "Last updated" date at the top will always reflect the latest version.',
      ],
    },
    {
      id: 'contact',
      heading: '9. Contact Us',
      paragraphs: [
        'Questions about this policy? Reach out — we are happy to help.',
        'Email: hello@oneplusonefashion.pk',
        'Studio: DHA Phase 5, Lahore, Pakistan',
      ],
    },
  ],
  contactEmail: 'hello@oneplusonefashion.pk',
};
