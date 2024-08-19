import { ReactNode, Suspense } from 'react';
import SideBar from '@/components/SideBar/SideBar';
import HomeLayoutLoading from '@/app/[locale]/(home)/loading';

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex h-full">
      <Suspense fallback={<HomeLayoutLoading />}>
        <SideBar />
        <div className="flex-1">{children}</div>
      </Suspense>
    </div>
  );
}
