// app/(website)/shop/page.tsx
import ShopPage from '@/components/website/product/ShopPage/ShopPage';
import { products } from '@/data/products';

export const metadata = {
  title: 'Shop All | Modern Kids Fashion',
  description:
    "Modern children's fashion for little personalities — girls, boys and baby.",
};

export default function Page() {
  // Server component: fetch/import data here and hand it to the client component.
  return <ShopPage products={products} />;
}
