// app/(website)/contact/page.tsx
import ContactPage from '@/components/website/contact/ContactPage';

export const metadata = {
  title: 'Contact Us',
  description:
    'Questions about an order, sizing or a little style advice? Our team would love to help.',
};

export default function Contact() {
  return <ContactPage />;
}
