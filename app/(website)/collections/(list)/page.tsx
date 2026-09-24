// app/(website)/collections/page.tsx
import CollectionsPage from '@/components/website/collections/CollectionsPage';

export const metadata = {
  title: 'Collections',
  description:
    'Explore every one + one FASHION collection — curated edits for girls, boys and baby.',
};

export default function Collections() {
  return <CollectionsPage />;
}
