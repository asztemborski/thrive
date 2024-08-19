import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
    error: string;
  }

  interface User {
    id: string;
    email: string;
    username: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    user: {
      id: string;
      email: string;
      username: string;
    };
    error: string;
  }
}
