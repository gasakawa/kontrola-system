import React, { createContext, useContext, useState } from 'react';

import api from '../services/api';

type UserInfo = {
  data: {
    sub: string;
    name: string;
    company: string;
    profile: number;
    sessionId: string;
  };
};

type SigninCredentials = {
  username: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SigninCredentials) => Promise<void>;
  signOut: () => void;
  user: UserInfo;
  token?: string;
}

type AuthState = {
  token?: string;
  user: UserInfo;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Kontrola:user');
    const token = localStorage.getItem('@Kontrola:token');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = async ({ username, password }: SigninCredentials): Promise<void> => {
    const { data: response } = await api({ url: '/user/signin', method: 'post', data: { username, password } });

    const { accessToken: token, tokenData } = response;

    const user = {
      data: tokenData,
    } as UserInfo;
    localStorage.setItem('@Kontrola:token', token);
    localStorage.setItem('@Kontrola:user', JSON.stringify(user));
    if (api.defaults.headers) {
      api.defaults.headers['x-access-token'] = token;
    }
  };

  const signOut = (): void => {
    localStorage.removeItem('@Kontrola:token');
    localStorage.removeItem('@Kontrola:user');
    setData({} as AuthState);
  };

  return (
    <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
