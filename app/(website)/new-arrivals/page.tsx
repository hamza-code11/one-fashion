// app/(website)/new-arrivals/page.tsx
import NewArrivalsPage from '@/components/website/newArrivals/NewArrivalsPage';

export const metadata = {
  title: 'New Arrivals',
  description:
    'Just in — the latest drops from one + one FASHION. Fresh styles for girls, boys and baby.',
};

export default function NewArrivals() {
  return <NewArrivalsPage />;
}
