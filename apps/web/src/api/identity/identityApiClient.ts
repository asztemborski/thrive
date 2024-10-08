import client from '../client';
import { getSession, signIn, signOut } from 'next-auth/react';
import { UNAUTHORIZED_ERROR_RESPONSE } from '@/utilities/error';

const IDENTITY_ROUTE = '/identity/v1';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpRequest = async (data: SignUpRequest) => {
  return client.post(`${IDENTITY_ROUTE}/public/user/sign-up`, data);
};

const signInRequest = async (data: SignInRequest) => {
  const response = await signIn('credentials', { ...data, redirect: false });

  if (response?.status === 401) throw UNAUTHORIZED_ERROR_RESPONSE;

  return response;
};

const confirmEmailRequest = async (token: string) => {
  return client.get(`${IDENTITY_ROUTE}/public/user/verify-email/${token}`);
};

const logoutRequest = async () => {
  const session = await getSession();

  if (!session) return signOut();

  await client.post(`${IDENTITY_ROUTE}/private/auth/logout`, {
    refreshToken: session.refreshToken,
  });

  await signOut();
};

const logoutAllRequest = async () => {
  return client.get(`${IDENTITY_ROUTE}/private/auth/logout/all`);
};

const requests = {
  signInRequest,
  signUpRequest,
  confirmEmailRequest,
  logoutRequest,
  logoutAllRequest,
};

export default requests;
