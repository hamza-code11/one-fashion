// data/about.ts

import { AboutData } from '@/types/About';

export const aboutData: AboutData = {
  hero: {
    eyebrow: 'Our Story',
    heading: 'About One + One',
    subheading: "Modern children's fashion, made with love in Pakistan.",
  },

  story: {
    eyebrow: 'Since Day One',
    heading: 'Childhood, Dressed Beautifully',
    paragraphs: [
      'one + one FASHION was born from a simple idea: children deserve clothing that is as joyful, curious and full of personality as they are. We blend comfortable fabrics, thoughtful details and modern design to create pieces for everyday adventures and special moments.',
      'Designed in Pakistan for families everywhere, every collection is made with care — because the way little ones experience the world matters.',
    ],
    image:
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1200&q=80',
    imageAlt: 'Children wearing One + One Fashion outfits',
  },

  philosophy: {
    eyebrow: 'What We Believe',
    heading: 'Our Philosophy',
    description:
      'Fashion should keep up with childhood — never the other way around. We design for movement, comfort and the little moments that become big memories.',
    values: [
      {
        id: 1,
        title: 'Comfort First',
        description:
          'Breathable cottons and soft finishes, gentle on the most sensitive little skin.',
      },
      {
        id: 2,
        title: 'Thoughtful Detail',
        description:
          'From hidden snaps to reinforced knees, the small things make a big difference.',
      },
      {
        id: 3,
        title: 'Made To Last',
        description:
          'Quality construction that survives hand-me-downs, washes and wild playdays.',
      },
    ],
  },

  quality: {
    eyebrow: 'Crafted With Care',
    heading: 'Quality & Comfort',
    description:
      "Every garment is tested for softness, durability and fit. We work closely with makers across Pakistan to ensure fair practices and finishes we're proud of — so each piece feels as good as it looks.",
    image:
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1200&q=80',
    imageAlt: 'Crafting One + One Fashion garments',
  },

  qualityStats: [
    { id: 1, value: '100%', label: 'Cotton-rich fabrics' },
    { id: 2, value: '7-Day', label: 'Easy returns' },
    { id: 3, value: 'Fair', label: 'Made practices' },
    { id: 4, value: 'PKR 10K+', label: 'Free delivery' },
  ],
};
