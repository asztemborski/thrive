'use client';

import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import { DialogFooter } from '@/components/Dialog';
import Button from '@/components/Button';

import { retrieveErrorTranslation } from '@/utilities/form';
import { useTranslations } from 'next-intl';
import { INPUT_ERROR_MESSAGES } from '@/constants/translations';
import collaborationApiClient from '@/api/collaboration/collaborationApiClient';
import CREATE_CATEGORY_FORM_RULES from '@/forms/CreateCategoryForm/createCategoryFormRules';

export type CreateCategoryFormValues = {
  name: string;
};

type CreateCategoryFormProps = {
  workspaceId: string;
  onSuccess?: (createdCategory: { id: string } & CreateCategoryFormValues) => void;
  parentCategoryId?: string;
};

const DEFAULT_FORM_VALUES: CreateCategoryFormValues = {
  name: '',
};

const CreateCategoryForm = ({
  workspaceId,
  onSuccess,
  parentCategoryId,
}: CreateCategoryFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = async (data: CreateCategoryFormValues) => {
    const createdCategoryId = await collaborationApiClient.createWorkspaceCategory(workspaceId, {
      ...data,
      parentCategoryId,
    });

    onSuccess && onSuccess({ id: createdCategoryId, ...data });
  };

  const inputErrorsTranslations = useTranslations(INPUT_ERROR_MESSAGES);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        component={Input}
        fieldName="name"
        placeholder="Name"
        control={control}
        rules={CREATE_CATEGORY_FORM_RULES.name}
        error={retrieveErrorTranslation<CreateCategoryFormValues>(
          inputErrorsTranslations,
          errors,
          'name',
        )}
      />
      <DialogFooter>
        <Button
          type="submit"
          variant="default"
          className=" justify-end rounded-xl font-bold tracking-widest  border"
        >
          Create
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CreateCategoryForm;
