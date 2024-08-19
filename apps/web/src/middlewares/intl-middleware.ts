import { CustomMiddleware } from '@/middlewares/chain';
import createMiddleware from 'next-intl/middleware';
import { LOCALES } from '@/constants/translations';
import { localePrefix } from '@/libs/navigation';
import { NextFetchEvent, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  defaultLocale: 'en',
  locales: LOCALES,
  localePrefix,
});

const withIntlMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = intlMiddleware(request);
    return middleware(request, event, response);
  };
};

export default withIntlMiddleware;
