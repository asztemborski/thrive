import '@/styles/global.css';

import { useLocale } from 'next-intl';
import { Quicksand } from 'next/font/google';
import { notFound } from 'next/navigation';

import { appDescription } from '@/constants/common';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: 'Welcome | Thrive',
  description: appDescription,
};

const quicksand = Quicksand({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
