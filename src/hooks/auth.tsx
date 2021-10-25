import React, { createContext, useContext, useState } from 'react';
import { SigninDTO, SigninResponse } from 'types';
import { SessionInfo } from 'types/session';

import api from '../services/api';

type UserInfo = {
  data: {
    sub: string;
    name: string;
    company: string;
    profile: number;
    sessionId: string;
    active: boolean;
    confirmed: boolean;
    profilePicUrl: string;
  };
};

type SigninCredentials = {
  username: string;
  password: string;
  sessionInfo: SessionInfo;
};

interface AuthContextData {
  signIn: (credentials: SigninCredentials) => Promise<SigninDTO>;
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

  const signIn = async ({ username, password, sessionInfo }: SigninCredentials): Promise<SigninDTO> => {
    const { data: response }: { data: SigninResponse } = await api({
      url: '/user/signin',
      method: 'post',
      data: { username, password, sessionInfo },
    });

    const { accessToken: token, tokenData, sessionLimits } = response;

    if (sessionLimits && !sessionLimits.allowLogin) {
      return {
        allowLogin: false,
        sessions: sessionLimits.sessions,
      };
    }

    const user = {
      data: tokenData,
    } as UserInfo;

    localStorage.setItem('@Kontrola:token', token);
    localStorage.setItem('@Kontrola:user', JSON.stringify(user));

    if (api.defaults.headers) {
      api.defaults.headers['x-access-token'] = token;
      api.defaults.headers['x-session-id'] = tokenData.sessionId;
    }

    setData({ token, user });

    return {
      allowLogin: true,
    };
  };

  const signOut = async (): Promise<void> => {
    const user = localStorage.getItem('@Kontrola:user');
    if (user) {
      const userObj = JSON.parse(user) as UserInfo;

      await api.put(`/session/signout/${userObj.data.sessionId}`);

      localStorage.removeItem('@Kontrola:token');
      localStorage.removeItem('@Kontrola:user');

      if (api.defaults.headers) {
        delete api.defaults.headers['x-access-token'];
        delete api.defaults.headers['x-session-id'];
      }
    }

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
