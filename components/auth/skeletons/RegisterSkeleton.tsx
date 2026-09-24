// components/auth/skeletons/RegisterSkeleton.tsx
import AuthFormSkeleton from './AuthFormSkeleton';

export default function RegisterSkeleton() {
  return (
    <AuthFormSkeleton
      fields={6}        // firstName, lastName, email, phone, password, confirm
      hasGrid={true}    // two-column first/last name
      hasCheckbox={true} // terms checkbox
    />
  );
}
