// app/(website)/faq/page.tsx
import FaqPage from '@/components/website/faq/FaqPage';

export const metadata = {
  title: 'FAQ',
  description:
    'Everything you need to know about shopping, sizing, delivery and returns.',
};

export default function FAQ() {
  return <FaqPage />;
}

