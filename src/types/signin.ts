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
};
