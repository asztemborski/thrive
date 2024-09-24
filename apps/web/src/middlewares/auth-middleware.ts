import { CustomMiddleware } from '@/middlewares/chain';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { LOCALES } from '@/constants/translations';
import {
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
  PUBLIC_ROUTES,
} from '@/constants/routes';
import { getToken } from 'next-auth/jwt';

const withAuthMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const token = await getToken({
      req: request,
    });

    const publicRoutesRegex = RegExp(
      `^(/(${LOCALES.join('|')}))?(${PUBLIC_ROUTES.join('|')})?/?$`,
      'i',
    );

    const dynamicPublicRoutesRegex = new RegExp(
      `^(/(${LOCALES.join('|')}))?/auth/confirm-email/[^/]+/?$`,
      'i',
    );

    const pathname = request.nextUrl.pathname;
    const isPublicRoute =
      publicRoutesRegex.test(pathname) || dynamicPublicRoutesRegex.test(pathname);

    const isAuthenticated = token !== null;
    const locale = request.nextUrl.locale || 'en';

    const defaultRoute = isAuthenticated
      ? DEFAULT_AUTHENTICATED_ROUTE
      : DEFAULT_UNAUTHENTICATED_ROUTE;

    if (!isPublicRoute && !isAuthenticated) {
      const redirectUrl = new URL(`${defaultRoute}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (isPublicRoute && isAuthenticated) {
      const redirectUrl = new URL(`/${locale}${defaultRoute}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return middleware(request, event, response);
  };
};

export default withAuthMiddleware;
