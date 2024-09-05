'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import identityApiRequests from '@/api/identity/identityApiClient';
import Button from '@/components/Button';
import { CardContent, CardFooter } from '@/components/Card';
import ConfirmEmailAlertDialog from '@/components/ConfirmEmailAlertDialog/ConfirmEmailAlertDialog';
import ErrorAlertDialog from '@/components/ErrorAlertDialog/ErrorAlertDialog';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import {
  API_ERROR_MESSAGES,
  INPUT_ERROR_MESSAGES,
  SIGNUP_FORM_MESSAGES,
} from '@/constants/translations';
import isApiError, { DEFAULT_ERROR_RESPONSE, ErrorResponse } from '@/utilities/error';
import { Link } from '@/libs/navigation';
import {
  IconAppWindowFilled,
  IconBrandGoogleFilled,
  IconKeyFilled,
  IconLockFilled,
  IconMailFilled,
} from '@tabler/icons-react';

import SIGNUP_FORM_RULES, { PASSWORD_MIN_LENGTH } from './signUpFormRules';
import { retrieveErrorTranslation, retrieveFieldTranslation } from '@/utilities/form';

export type SignUpFormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const DEFAULT_FORM_VALUES: SignUpFormValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const EMAIL_CONFIRM_ALERT_DIALOG = 'EMAIL_CONFIRM_ALERT_DIALOG';
const ERROR_ALERT_DIALOG = 'ERROR_ALERT_DIALOG';

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const formTranslations = useTranslations(SIGNUP_FORM_MESSAGES);
  const inputErrorsTranslations = useTranslations(INPUT_ERROR_MESSAGES);
  const apiErrorTranslations = useTranslations(API_ERROR_MESSAGES);

  const [displayAlertDialog, setDisplayAlertDialog] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);

      await identityApiRequests.signUpRequest(data);
      reset();

      setDisplayAlertDialog(EMAIL_CONFIRM_ALERT_DIALOG);
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

  const onGoogleRegisterButtonClicked = async () => {
    console.log('Google auth');
  };

  const onAlertDialogContinue = () => setDisplayAlertDialog('');

  return (
    <Fragment>
      <ConfirmEmailAlertDialog
        isOpen={displayAlertDialog === EMAIL_CONFIRM_ALERT_DIALOG}
        onContinue={onAlertDialogContinue}
      />
      <ErrorAlertDialog
        isOpen={displayAlertDialog === ERROR_ALERT_DIALOG}
        onContinue={onAlertDialogContinue}
        errorMessage={apiErrorTranslations(error?.code)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col space-y-2">
          <FormField
            component={Input}
            fieldName="email"
            label={retrieveFieldTranslation<SignUpFormValues>(formTranslations, 'email', 'label')}
            placeholder={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'email',
              'placeholder',
            )}
            rules={SIGNUP_FORM_RULES.email}
            control={control}
            error={retrieveErrorTranslation<SignUpFormValues>(
              inputErrorsTranslations,
              errors,
              'email',
            )}
            icon={<IconMailFilled size="20px" />}
            disabled={isLoading}
            className="bg-card"
          />
          <FormField
            component={Input}
            fieldName="username"
            label={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'username',
              'label',
            )}
            placeholder={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'username',
              'placeholder',
            )}
            rules={SIGNUP_FORM_RULES.username}
            error={retrieveErrorTranslation<SignUpFormValues>(
              inputErrorsTranslations,
              errors,
              'username',
            )}
            control={control}
            icon={<IconAppWindowFilled size="20px" />}
            disabled={isLoading}
            className="bg-card"
          />
          <FormField
            component={Input}
            type="password"
            fieldName="password"
            label={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'password',
              'label',
            )}
            placeholder={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'password',
              'placeholder',
            )}
            rules={SIGNUP_FORM_RULES.password}
            control={control}
            error={retrieveErrorTranslation<SignUpFormValues>(
              inputErrorsTranslations,
              errors,
              'password',
              { number: PASSWORD_MIN_LENGTH },
            )}
            icon={<IconKeyFilled size="20px" />}
            disabled={isLoading}
            autoComplete="on"
            className="bg-card"
          />
          <FormField
            component={Input}
            fieldName="confirmPassword"
            type="password"
            label={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'confirmPassword',
              'label',
            )}
            placeholder={retrieveFieldTranslation<SignUpFormValues>(
              formTranslations,
              'confirmPassword',
              'placeholder',
            )}
            rules={SIGNUP_FORM_RULES.confirmPassword}
            control={control}
            error={retrieveErrorTranslation<SignUpFormValues>(
              inputErrorsTranslations,
              errors,
              'confirmPassword',
              { number: PASSWORD_MIN_LENGTH },
            )}
            icon={<IconLockFilled size="20px" />}
            disabled={isLoading}
            autoComplete="on"
            className="bg-card"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-6">
          <span className="text-sm ">
            {formTranslations('agreements')}{' '}
            <Link className="underline" href="/terms">
              {formTranslations('termsAndPolicy')}
            </Link>
          </span>
          <div className="w-full px-6 flex flex-row space-x-4">
            <Button
              variant="default"
              type="button"
              disabled={isLoading}
              onClick={onGoogleRegisterButtonClicked}
              className="w-full  rounded-xl font-extrabold  space-y-2 tracking-widest text-md  border"
            >
              <div className="flex flex-row items-center space-x-2">
                <span>Continue with</span>
                <IconBrandGoogleFilled className="w-[20px]" />
              </div>
            </Button>
            <Button
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="w-full  rounded-xl font-extrabold  tracking-widest text-md bg-card text-white border"
            >
              {formTranslations('signUp')}
            </Button>
          </div>
          <span className="text-sm">
            {formTranslations('accountExists')}{' '}
            <Link className="underline" href="/auth/sign-in">
              {formTranslations('logIn')}
            </Link>
          </span>
        </CardFooter>
      </form>
    </Fragment>
  );
};

export default SignUpForm;
