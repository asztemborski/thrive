import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { NextAuthOptions, Session, User } from 'next-auth';
import { API_URL } from '@/constants/common';
import client from '@/api/client';

type UserPayload = {
  id: string;
  email: string;
  username: string;
};

const decodeAccessToken = (token: string): UserPayload => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

type Credentials = Record<'email' | 'password', string> | undefined;

const authorize = async (credentials: Credentials): Promise<User | null> => {
  if (!credentials) return null;

  const response = await fetch(`${API_URL}/identity/v1/public/auth/authenticate`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return null;

  const data = await response.json();
  const { id, email, username } = decodeAccessToken(data.accessToken);
  return { id, email, username, ...data };
};

type JwtCallbackParams = {
  token: JWT;
  user: User;
};

const jwtCallback = async ({ token, user }: JwtCallbackParams): Promise<JWT> => {
  if (user) {
    const { accessToken, refreshToken, expiresAt, id, email, username } = user;
    token = {
      ...token,
      accessToken,
      refreshToken,
      expiresAt,
      user: { id, email, username },
      error: '',
    };
  }

  if (Date.now() < token.expiresAt) {
    return token;
  }

  try {
    const response = await fetch(`${API_URL}/identity/v1/public/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const { id, email, username } = decodeAccessToken(data.accessToken);

    client.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

    token = {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: data.expiresAt,
      user: { id, email, username },
      error: '',
    };

    return token;
  } catch (err) {
    return { ...token, error: 'RefreshTokenError' };
  }
};

type SessionCallbackParams = {
  session: Session;
  token: JWT;
};

const sessionCallback = async ({ session, token }: SessionCallbackParams): Promise<Session> => {
  session.accessToken = token.accessToken;
  session.refreshToken = token.refreshToken;
  session.error = token.error;
  session.user = token.user;

  client.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;

  return session;
};

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize,
    }),
  ],
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
} satisfies NextAuthOptions;

export default authConfig;
