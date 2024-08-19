import { LOCALES } from '@/constants/translations';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const localePrefix = 'always';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: LOCALES,
  localePrefix,
});
