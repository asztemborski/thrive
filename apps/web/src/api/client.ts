import axios from 'axios';

import { API_URL } from '@/constants/common';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import authConfig from '@/libs/auth';

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.response.use(undefined, ({ response }) => {
  const data = response.data;
  if (data.statusCode) {
    return Promise.reject(data);
  }

  return data;
});

client.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  if (!session?.accessToken) {
    const session = await getServerSession(authConfig);
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
  }

  return config;
});

export default client;
