import axios from 'axios';

import { API_URL } from '@/constants/common';
import { getSession, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import authConfig from '@/libs/auth';

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.response.use(undefined, async ({ response }) => {
  const data = response.data;

  if (data.statusCode === 401) {
    client.defaults.headers.common.Authorization = undefined;
  }

  if (data.statusCode) {
    return Promise.reject(data);
  }

  return data;
});

client.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) return config;

  const session =
    typeof window === 'undefined' ? await getServerSession(authConfig) : await getSession();

  if (session) {
    const authHeaderValue = `Bearer ${session?.accessToken}`;

    config.headers.Authorization = authHeaderValue;
    client.defaults.headers.common.Authorization = authHeaderValue;
  }

  return config;
});

export default client;
