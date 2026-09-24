// components/auth/skeletons/LoginSkeleton.tsx
import AuthFormSkeleton from './AuthFormSkeleton';

export default function LoginSkeleton() {
  return (
    <AuthFormSkeleton
      fields={2}         // email, password
      hasForgot={true}   // "Forgot?" link
      hasCheckbox={true} // keep me signed in
    />
  );
}
