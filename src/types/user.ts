export type User = {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  flgActive: boolean;
  flgConfirmed: boolean;
  gender: string;
  headquarter: string;
  profilePic: string;
  givenName: string;
  familyName: string;
  id: string;
};

export type UserProfile = {
  user: User;
  plan: {
    lastPaymentDate: string;
    nextPaymentDate: string;
    name: string;
    value: string;
    overdue: boolean;
  };
};

export type UserDTO = {
  username: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  givenName: string;
  familyName: string;
  email: string;
  documentId: string;
  companyId: string;
  roleId: number;
  documentType: number;
  headquarterId: number;
};
