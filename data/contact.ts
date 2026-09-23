// data/contact.ts

import { ContactData } from '@/types/Contact';

export const contactData: ContactData = {
  info: {
    eyebrow: "We're Here To Help",
    heading: 'Get In Touch',
    description:
      'Questions about an order, sizing or a little style advice? Our team would love to help.',
    cards: [
      {
        id: 1,
        title: 'Email',
        value: 'hello@oneplusonefashion.pk',
        note: 'We reply within 24 hours',
      },
      {
        id: 2,
        title: 'Phone',
        value: '+92 300 1234567',
        note: 'Mon–Sat, 10am–7pm PKT',
      },
      {
        id: 3,
        title: 'Studio',
        value: 'DHA Phase 5, Lahore',
        note: 'Pakistan',
      },
      {
        id: 4,
        title: 'Hours',
        value: 'Monday – Saturday',
        note: '10:00am – 7:00pm',
      },
    ],
  },
  formLabels: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Send Message',
    submitting: 'Sending...',
    success: "Thanks! We'll get back to you within 24 hours.",
    error: 'Something went wrong. Please try again.',
  },
};


