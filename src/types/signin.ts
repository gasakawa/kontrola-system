export type SigninResponse = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
  tokenData: {
    name: string;
    sub: string;
    company: string;
    profile: number;
    sessionId: string;
    active: boolean;
    confirmed: boolean;
  };
  sessionLimits?: {
    allowLogin: boolean;
    email: string;
    userSessionsNumber: number;
    devicesLimit: number;
    sessions: [
      {
        id: string;
        createdAt: Date;
        email: string;
      },
    ];
  };
};

export type SigninDTO = {
  allowLogin: boolean;
  sessions?: [
    {
      id: string;
      createdAt: Date;
      email: string;
    },
  ];
};
