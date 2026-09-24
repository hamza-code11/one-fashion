// app/(auth)/login/page.tsx
import LoginPage from '@/components/auth/LoginPage/LoginPage';

export const metadata = {
  title: 'Login',
  description: 'Login to your one + one FASHION account.',
};

export default function Login() {
  return <LoginPage />;
}
