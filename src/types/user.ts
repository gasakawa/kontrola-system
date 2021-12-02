export type UserProfile = {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  flgActive: boolean;
  flgConfirmed: boolean;
  gender: string;
  headquarter: string;
  profilePic: string;
  plan: {
    lastPaymentDate: string;
    nextPaymentDate: string;
    name: string;
    value: string;
    dateISO: string;
  };
  givenName: string;
  familyName: string;
  id: string;
};
