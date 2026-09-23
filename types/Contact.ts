// types/Contact.ts

export interface ContactInfoCard {
  id: number;
  title: string;
  value: string;
  note: string;
}

export interface ContactInfo {
  eyebrow: string;
  heading: string;
  description: string;
  cards: ContactInfoCard[];
}

export interface ContactFormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormLabels {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
}

export interface ContactData {
  info: ContactInfo;
  formLabels: ContactFormLabels;
}
