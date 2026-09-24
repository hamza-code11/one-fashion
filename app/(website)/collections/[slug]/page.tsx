// app/(website)/collections/[slug]/page.tsx
import CollectionProductsPage from '@/components/website/CollectionProductsPage/CollectionProductsPage';

export const metadata = {
  title: 'Collection',
  description:
    'Explore our curated collection — thoughtfully made for little personalities.',
};

export default function CollectionPage() {
  return <CollectionProductsPage />;
}
