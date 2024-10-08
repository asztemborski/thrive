'use client';

import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import { DialogFooter } from '@/components/Dialog';
import Button from '@/components/Button';
import CREATE_THREAD_FORM_RULES from '@/forms/CreateThreadForm/createThreadFormRules';
import { retrieveErrorTranslation } from '@/utilities/form';
import { useTranslations } from 'next-intl';
import { INPUT_ERROR_MESSAGES } from '@/constants/translations';
import collaborationApiClient from '@/api/collaboration/collaborationApiClient';
import { Thread } from '@/components/ThreadsTree';

export type CreateThreadFormValues = {
  name: string;
};

type CreateThreadFormProps = {
  workspaceId: string;
  onSuccess?: (createdThread: Thread) => void;
  categoryId?: string;
};

const DEFAULT_FORM_VALUES: CreateThreadFormValues = {
  name: '',
};

const CreateThreadForm = ({ workspaceId, onSuccess, categoryId }: CreateThreadFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateThreadFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = async (data: CreateThreadFormValues) => {
    const id = await collaborationApiClient.createWorkspaceThreadRequest(workspaceId, {
      ...data,
      categoryId,
    });

    onSuccess && onSuccess({ ...data, id, categoryId });
  };

  const inputErrorsTranslations = useTranslations(INPUT_ERROR_MESSAGES);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        component={Input}
        fieldName="name"
        placeholder="Name"
        control={control}
        rules={CREATE_THREAD_FORM_RULES.name}
        error={retrieveErrorTranslation<CreateThreadFormValues>(
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

export default CreateThreadForm;
