import { ReactNode, Suspense } from 'react';
import SideBar from '@/components/SideBar/SideBar';
import HomeLayoutLoading from '@/app/[locale]/(home)/loading';
import {
  CREATE_ORGANIZATION_DIALOG_MESSAGES,
  CREATE_ORGANIZATION_FORM_MESSAGES,
  INPUT_ERROR_MESSAGES,
  ORGANIZATION_SELECT_MENU_MESSAGES,
} from '@/constants/translations';
import MessagesProvider from '@/containers/MessagesProvider';

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex h-full">
      <Suspense fallback={<HomeLayoutLoading />}>
        <MessagesProvider
          namespaces={[
            INPUT_ERROR_MESSAGES,
            CREATE_ORGANIZATION_FORM_MESSAGES,
            ORGANIZATION_SELECT_MENU_MESSAGES,
            CREATE_ORGANIZATION_DIALOG_MESSAGES,
          ]}
        >
          <SideBar />
        </MessagesProvider>
        <div className="flex-1">{children}</div>
      </Suspense>
    </div>
  );
}
