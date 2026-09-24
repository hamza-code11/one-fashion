// app/(website)/account/page.tsx
import AccountPage from '@/components/website/account/AccountPage';

export const metadata = {
  title: 'My Account',
  description: 'Manage your one + one FASHION account details.',
};

export default function Account() {
  return <AccountPage />;
}
