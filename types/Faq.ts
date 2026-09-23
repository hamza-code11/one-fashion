// types/Faq.ts

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqData {
  eyebrow: string;
  heading: string;
  description: string;
  items: FaqItem[];
}
