// app/admin/layout.tsx
import AdminShell from '@/components/admin/layout/AdminShell/AdminShell';

export const metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin — One + One',
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminShell>{children}</AdminShell>;
}