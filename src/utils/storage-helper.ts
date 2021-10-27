import { UserInfo } from 'types';

export const getToken = (): string | null => {
  const token = localStorage.getItem('@Kontrola:token');
  if (token) {
    return token;
  }

  return null;
};

export const getUser = (): UserInfo | null => {
  const user = localStorage.getItem('@Kontrola:user');
  if (user) {
    return JSON.parse(user);
  }

  return null;
};
