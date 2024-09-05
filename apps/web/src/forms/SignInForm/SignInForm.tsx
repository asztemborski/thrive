'use client';

import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { CardContent, CardFooter } from '@/components/Card';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import { Link } from '@/libs/navigation';
import { Separator } from '@radix-ui/react-separator';
import { IconBrandGoogleFilled, IconKeyFilled, IconMailFilled } from '@tabler/icons-react';

import SIGNIN_FORM_RULES from './signInFormRules';
import { useState } from 'react';
import isApiError, { DEFAULT_ERROR_RESPONSE, ErrorResponse } from '@/utilities/error';
import { useLocale, useTranslations } from 'next-intl';
import {
  API_ERROR_MESSAGES,
  INPUT_ERROR_MESSAGES,
  SIGNIN_FORM_MESSAGES,
} from '@/constants/translations';
import ErrorAlertDialog from '@/components/ErrorAlertDialog/ErrorAlertDialog';
import identityApiClient from '@/api/identity/identityApiClient';
import { DEFAULT_AUTHENTICATED_ROUTE } from '@/constants/routes';
import { retrieveErrorTranslation, retrieveFieldTranslation } from '@/utilities/form';

export type SignInFormValues = {
  email: string;
  password: string;
};

const DEFAULT_FORM_VALUES: SignInFormValues = {
  email: '',
  password: '',
};

const ERROR_ALERT_DIALOG = 'ERROR_ALERT_DIALOG';

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const formTranslations = useTranslations(SIGNIN_FORM_MESSAGES);
  const inputErrorsTranslations = useTranslations(INPUT_ERROR_MESSAGES);
  const apiErrorTranslations = useTranslations(API_ERROR_MESSAGES);
  const locale = useLocale();

  const [displayAlertDialog, setDisplayAlertDialog] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onAlertDialogContinue = () => setDisplayAlertDialog('');

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);
      await identityApiClient.signInRequest(data);

      window.location.href = `/${locale}${DEFAULT_AUTHENTICATED_ROUTE}`;
      reset();
    } catch (error) {
      if (isApiError(error)) {
        setError(error);
        setDisplayAlertDialog(ERROR_ALERT_DIALOG);
        return;
      }

      setError(DEFAULT_ERROR_RESPONSE);
      setDisplayAlertDialog(ERROR_ALERT_DIALOG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorAlertDialog
        isOpen={displayAlertDialog === ERROR_ALERT_DIALOG}
        onContinue={onAlertDialogContinue}
        errorMessage={apiErrorTranslations(error?.code)}
      />
      <CardContent className="flex flex-col space-y-2">
        <FormField
          component={Input}
          fieldName="email"
          label={retrieveFieldTranslation<SignInFormValues>(formTranslations, 'email', 'label')}
          placeholder={retrieveFieldTranslation<SignInFormValues>(
            formTranslations,
            'email',
            'placeholder',
          )}
          rules={SIGNIN_FORM_RULES.email}
          control={control}
          error={retrieveErrorTranslation<SignInFormValues>(
            inputErrorsTranslations,
            errors,
            'email',
          )}
          icon={<IconMailFilled size="20px" />}
          className="bg-card"
        />
        <FormField
          component={Input}
          type="password"
          fieldName="password"
          label={retrieveFieldTranslation<SignInFormValues>(formTranslations, 'password', 'label')}
          placeholder={retrieveFieldTranslation<SignInFormValues>(
            formTranslations,
            'password',
            'placeholder',
          )}
          rules={SIGNIN_FORM_RULES.password}
          control={control}
          icon={<IconKeyFilled size="20px" />}
          error={retrieveErrorTranslation<SignInFormValues>(
            inputErrorsTranslations,
            errors,
            'password',
          )}
          autoComplete="on"
          className="bg-card"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-6">
        <div className="w-full px-6 flex flex-col space-y-4 ">
          <Button
            type="submit"
            variant="default"
            className="w-full rounded-xl font-extrabold  tracking-widest text-md  border"
            disabled={isLoading}
          >
            {formTranslations('signIn')}
          </Button>
          <div className="w-full">
            <Separator className="bg-red-500 text-white" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 ">{formTranslations('continueWith')}</span>
            </div>
          </div>
          <Button
            variant="secondary"
            type="button"
            className="w-full rounded-xl font-extrabold  bg-card  space-y-2 tracking-widest text-md  border"
            disabled={isLoading}
          >
            <div className="flex flex-row items-center space-x-2">
              <IconBrandGoogleFilled className="w-[20px]" />
              <span>Google</span>
            </div>
          </Button>
        </div>
        <span className="text-sm">
          {formTranslations('noAccount')}{' '}
          <Link className="underline" href="/auth/sign-up">
            {formTranslations('signUp')}
          </Link>
        </span>
      </CardFooter>
    </form>
  );
};

export default SignInForm;
