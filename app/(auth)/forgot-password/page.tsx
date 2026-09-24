// app/(auth)/forgot-password/page.tsx
import ForgotPasswordPage from '@/components/auth/ForgotPasswordPage/ForgotPasswordPage';

export const metadata = {
  title: 'Reset Password',
  description: 'Reset your one + one FASHION account password.',
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}