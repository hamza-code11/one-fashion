import type { Metadata } from 'next';
import SizeGuide from '@/components/website/sizeguide/Sizeguide';

export const metadata: Metadata = {
  title: 'Size Guide | one + one Fashion',
  description:
    'Find the right fit for your little one. Measure height, chest, and weight, and match to our kids\' clothing size chart.',
};

export default function SizeGuidePage() {
  return <SizeGuide />;
}
