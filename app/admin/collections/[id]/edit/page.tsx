// app/admin/collections/[id]/edit/page.tsx
import EditCollectionPage from '@/components/admin/collections/EditCollectionPage';
import { collections } from '@/data/collections';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const collection = collections.find((c) => c.id === Number(id));
  return {
    title: collection ? `Edit ${collection.name}` : 'Edit Collection',
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const collection = collections.find((c) => c.id === Number(id));

  if (!collection) notFound();

  return <EditCollectionPage collection={collection} />;
}

