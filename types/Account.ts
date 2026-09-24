// types/Account.ts

export interface AccountUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AccountTab {
  id: 'profile' | 'orders';
  label: string;
}

export interface AccountData {
  title: string;
  user: AccountUser;
  tabs: AccountTab[];
  profileHeading: string;
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    save: string;
    saving: string;
    saved: string;
  };
}
