import { chain } from '@/middlewares/chain';
import withIntlMiddleware from '@/middlewares/intl-middleware';
import withAuthMiddleware from '@/middlewares/auth-middleware';

export default chain([withIntlMiddleware, withAuthMiddleware]);

export const config = {
  matcher: ['/', `/(en|pl)/:path*`],
};
