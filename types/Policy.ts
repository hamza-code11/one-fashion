// types/Policy.ts

export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PolicyData {
  eyebrow: string;
  heading: string;
  lastUpdated: string;
  intro: string;
  sections: PolicySection[];
  contactEmail: string;
}
