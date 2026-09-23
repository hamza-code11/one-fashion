// types/About.ts

export interface AboutHero {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface AboutStory {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

export interface PhilosophyValue {
  id: number;
  title: string;
  description: string;
}

export interface AboutPhilosophy {
  eyebrow: string;
  heading: string;
  description: string;
  values: PhilosophyValue[];
}

export interface AboutQuality {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface QualityStat {
  id: number;
  value: string;
  label: string;
}

export interface AboutData {
  hero: AboutHero;
  story: AboutStory;
  philosophy: AboutPhilosophy;
  quality: AboutQuality;
  qualityStats: QualityStat[];
}
