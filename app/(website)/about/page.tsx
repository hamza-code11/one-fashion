// app/(website)/about/page.tsx
import AboutPage from '@/components/website/about/AboutPage';

export const metadata = {
  title: 'About Us',
  description:
    "Modern children's fashion, made with love in Pakistan. Discover the One + One story.",
};

export default function About() {
  return <AboutPage />;
}
