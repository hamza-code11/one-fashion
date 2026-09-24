// components/auth/skeletons/ForgotPasswordSkeleton.tsx
import AuthFormSkeleton from './AuthFormSkeleton';

export default function ForgotPasswordSkeleton() {
  return (
    <AuthFormSkeleton
      fields={1} // email only
    />
  );
}
