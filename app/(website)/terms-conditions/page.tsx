// app/(website)/terms-conditions/page.tsx
import TermsPage from '@/components/website/policies/TermsPage';

export const metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms that govern your use of the one + one FASHION website and purchase of our products.',
};

export default function Terms() {
  return <TermsPage />;
}
