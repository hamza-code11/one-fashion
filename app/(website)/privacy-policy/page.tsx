// app/(website)/privacy-policy/page.tsx
import PrivacyPolicyPage from '@/components/website/policies/PrivacyPolicyPage';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How one + one FASHION collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
