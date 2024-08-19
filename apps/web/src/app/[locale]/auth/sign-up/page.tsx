import { useTranslations } from 'next-intl';

import Card, { CardDescription, CardHeader, CardTitle } from '@/components/Card';
import {
  API_ERROR_MESSAGES,
  EMAIL_CONFIRM_DIALOG_MESSAGES,
  ERROR_ALERT_DIALOG_MESSAGES,
  INPUT_ERROR_MESSAGES,
  SIGNUP_FORM_MESSAGES,
  SIGNUP_PAGE_MESSAGES,
} from '@/constants/translations';
import MessagesProvider from '@/containers/MessagesProvider';
import SignUpForm from '@/forms/SignUpForm';
import { Link } from '@/libs/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function SignUpPage() {
  const t = useTranslations(SIGNUP_PAGE_MESSAGES);

  return (
    <main className=" bg-card  flex justify-center items-center px-[30vw]">
      <Link
        href="/"
        className="invisible md:visible flex flex-row items-center absolute left-24 top-14 "
      >
        <IconChevronLeft />
        <p className="pl-1">{t('back')}</p>
      </Link>
      <div className="w-full max-h-screen">
        <Card className="bg-[#101214]  h-full min-w-max">
          <CardHeader className="flex flex-col items-center space-y-3">
            <CardTitle className="text-3xl font-bold">{t('signUp')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <MessagesProvider
            namespaces={[
              SIGNUP_FORM_MESSAGES,
              INPUT_ERROR_MESSAGES,
              SIGNUP_PAGE_MESSAGES,
              EMAIL_CONFIRM_DIALOG_MESSAGES,
              ERROR_ALERT_DIALOG_MESSAGES,
              API_ERROR_MESSAGES,
            ]}
          >
            <SignUpForm />
          </MessagesProvider>
        </Card>
      </div>
    </main>
  );
}
