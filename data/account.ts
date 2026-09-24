// data/account.ts

import { AccountData } from '@/types/Account';

export const accountData: AccountData = {
  title: 'My Account',
  user: {
    firstName: 'Ayesha',
    lastName: 'Khan',
    email: 'ayesha@example.com',
    phone: '+92 300 1234567',
  },
  tabs: [
    { id: 'profile', label: 'Profile' },
    { id: 'orders', label: 'Orders' },
  ],
  profileHeading: 'Profile Details',
  labels: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    save: 'Save Changes',
    saving: 'Saving...',
    saved: 'Saved',
  },
};
