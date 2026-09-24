// app/admin/brands/[id]/edit/page.tsx
import EditBrandPage from '@/components/admin/brands/EditBrandPage';
import { brands } from '@/data/brands';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const brand = brands.find((b) => b.id === Number(id));
  return {
    title: brand ? `Edit ${brand.name}` : 'Edit Brand',
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const brand = brands.find((b) => b.id === Number(id));

  if (!brand) notFound();

  return <EditBrandPage brand={brand} />;
}
