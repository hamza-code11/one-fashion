import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductPage from '@/components/website/ProductDetails/Productpage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <ProductPage
      product={product}
      allProducts={products}
    />
  );
}
