import { FieldErrors, RegisterOptions } from 'react-hook-form';
import { Formats, TranslationValues } from 'next-intl';

export type FormRules<T extends { [key: string]: any }> = Record<
  keyof T,
  RegisterOptions<any, string>
>;

type Messages = (
  key: string | undefined,
  values?: TranslationValues,
  formats?: Partial<Formats>,
) => string;

export function retrieveErrorTranslation<T extends Record<string, any>>(
  messages: Messages,
  errors: FieldErrors<T>,
  fieldName: keyof T,
  props?: Record<string, any>,
): string | undefined {
  if (!errors[fieldName]) return undefined;

  return messages(errors[fieldName]?.message as string, props);
}

export function retrieveFieldTranslation<T extends Record<string, any>>(
  messages: Messages,
  fieldName: keyof T,
  property: string,
): string {
  return messages(`${String(fieldName)}.${property}`);
}
