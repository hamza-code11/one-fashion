// app/admin/categories/[id]/edit/page.tsx
import EditCategoryPage from '@/components/admin/categories/EditCategoryPage';
import { categories } from '@/data/categories';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === Number(id));
  return {
    title: category ? `Edit ${category.title}` : 'Edit Category',
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === Number(id));

  if (!category) notFound();

  return <EditCategoryPage category={category} />;
}

