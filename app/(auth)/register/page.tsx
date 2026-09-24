// app/(auth)/register/page.tsx
import RegisterPage from '@/components/auth/RegisterPage/RegisterPage';

export const metadata = {
  title: 'Create Account',
  description: 'Join one + one FASHION — create your account in seconds.',
};

export default function Register() {
  return <RegisterPage />;
}
