import { getTranslations } from 'next-intl/server';

import Button from '@/components/Button';
import { CardContent, CardDescription, CardTitle } from '@/components/Card';
import { EMAIL_CONFIRM_PAGE_MESSAGES } from '@/constants/translations';
import { Link } from '@/libs/navigation';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import identityApiClient from '@/api/identity/identityApiClient';

type ConfirmEmailPageProps = {
  params: { token: string };
};

const confirmEmailRequest = async (confirmationToken: string): Promise<boolean> => {
  return identityApiClient
    .confirmEmailRequest(confirmationToken)
    .then(() => true)
    .catch(() => false);
};

const ConfirmEmailPage = async ({ params }: ConfirmEmailPageProps) => {
  const t = await getTranslations(EMAIL_CONFIRM_PAGE_MESSAGES);

  const success = await confirmEmailRequest(params.token);

  return (
    <main className=" bg-card bg-[#101214] flex-col flex justify-center items-center ">
      <CardTitle className="text-3xl font-bold">
        {t(success ? 'success.title' : 'error.title')}
      </CardTitle>
      <CardContent className=" flex flex-col items-center justify-center space-y-10 py-10">
        {success ? <IconCircleCheckFilled size={'150px'} /> : <IconCircleXFilled size={'150px'} />}
        <CardDescription className="text-lg">
          {t(success ? 'success.description' : 'error.description')}
        </CardDescription>
        <Link href={success ? '/auth/sign-in' : '/'}>
          <Button
            className="font-bold tracking-widest px-6 py-6 rounded-[5px] text-lg border"
            variant="secondary"
          >
            {t(success ? 'success.signIn' : 'error.back')}
          </Button>
        </Link>
      </CardContent>
    </main>
  );
};

export default ConfirmEmailPage;
