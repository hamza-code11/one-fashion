// app/admin/products/[id]/edit/page.tsx
import EditProductPage from '@/components/admin/products/EditProductPage';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  return { title: product ? `Edit ${product.name}` : 'Edit Product' };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return <EditProductPage product={product} />;
}
