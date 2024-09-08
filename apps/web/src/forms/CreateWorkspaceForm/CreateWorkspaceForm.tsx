import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { DialogFooter } from '@/components/Dialog';
import collaborationApiClient from '@/api/collaboration/collaborationApiClient';
import { useTranslations } from 'next-intl';
import { CREATE_WORKSPACE_FORM_MESSAGES, INPUT_ERROR_MESSAGES } from '@/constants/translations';
import { retrieveErrorTranslation, retrieveFieldTranslation } from '@/utilities/form';
import { Workspace } from '@/components/SideBar';
import CREATE_WORKSPACE_FORM_RULES from '@/forms/CreateWorkspaceForm/createWorkspaceFormRules';

export type CreateWorkspaceFormValues = {
  name: string;
  description: string;
};

const DEFAULT_FORM_VALUES: CreateWorkspaceFormValues = {
  name: '',
  description: '',
};

type CreateWorkspaceFormProps = {
  onSuccess?: (createdWorkspace: Workspace) => void;
};

const CreateWorkspaceForm = ({ onSuccess }: CreateWorkspaceFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const inputErrorsTranslations = useTranslations(INPUT_ERROR_MESSAGES);
  const formTranslations = useTranslations(CREATE_WORKSPACE_FORM_MESSAGES);

  const onSubmit = async (data: CreateWorkspaceFormValues) => {
    const id = await collaborationApiClient.createWorkspaceRequest(data);
    onSuccess && onSuccess({ id, ...data, iconUrl: null });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        component={Input}
        fieldName="name"
        label={retrieveFieldTranslation<CreateWorkspaceFormValues>(
          formTranslations,
          'name',
          'label',
        )}
        placeholder={retrieveFieldTranslation<CreateWorkspaceFormValues>(
          formTranslations,
          'name',
          'placeholder',
        )}
        control={control}
        rules={CREATE_WORKSPACE_FORM_RULES.name}
        error={retrieveErrorTranslation<CreateWorkspaceFormValues>(
          inputErrorsTranslations,
          errors,
          'description',
        )}
      />
      <FormField
        component={Input}
        fieldName="description"
        label={retrieveFieldTranslation<CreateWorkspaceFormValues>(
          formTranslations,
          'description',
          'label',
        )}
        placeholder={retrieveFieldTranslation<CreateWorkspaceFormValues>(
          formTranslations,
          'description',
          'placeholder',
        )}
        control={control}
        rules={CREATE_WORKSPACE_FORM_RULES.description}
        error={retrieveErrorTranslation<CreateWorkspaceFormValues>(
          inputErrorsTranslations,
          errors,
          'description',
        )}
      />
      <DialogFooter>
        <Button
          type="submit"
          variant="default"
          className=" justify-end rounded-xl font-bold tracking-widest  border"
        >
          {formTranslations('create')}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CreateWorkspaceForm;
