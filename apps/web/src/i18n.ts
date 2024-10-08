import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'pl'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) return notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
