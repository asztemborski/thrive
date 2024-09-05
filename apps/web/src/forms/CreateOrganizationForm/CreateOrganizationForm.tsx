import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { DialogFooter } from '@/components/Dialog';
import organizationApiClient from '@/api/organization/organizationApiClient';
import CREATE_ORGANIZATION_FORM_RULES from '@/forms/CreateOrganizationForm/createOrganizationFormRules';
import { useTranslations } from 'next-intl';
import { CREATE_ORGANIZATION_FORM_MESSAGES, INPUT_ERROR_MESSAGES } from '@/constants/translations';
import { retrieveErrorTranslation, retrieveFieldTranslation } from '@/utilities/form';
import { Organization } from '@/components/SideBar';

export type CreateOrganizationFormValues = {
  name: string;
  description: string;
};

const DEFAULT_FORM_VALUES: CreateOrganizationFormValues = {
  name: '',
  description: '',
};

type CreateOrganizationFormProps = {
  onSuccess?: (createdOrganization: Organization) => void;
};

const CreateOrganizationForm = ({ onSuccess }: CreateOrganizationFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const inputErrorsTranslations = useTranslations(INPUT_ERROR_MESSAGES);
  const formTranslations = useTranslations(CREATE_ORGANIZATION_FORM_MESSAGES);

  const onSubmit = async (data: CreateOrganizationFormValues) => {
    const id = await organizationApiClient.createOrganizationRequest(data);
    onSuccess && onSuccess({ id, ...data, iconUrl: null });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        component={Input}
        fieldName="name"
        label={retrieveFieldTranslation<CreateOrganizationFormValues>(
          formTranslations,
          'name',
          'label',
        )}
        placeholder={retrieveFieldTranslation<CreateOrganizationFormValues>(
          formTranslations,
          'name',
          'placeholder',
        )}
        control={control}
        rules={CREATE_ORGANIZATION_FORM_RULES.name}
        error={retrieveErrorTranslation<CreateOrganizationFormValues>(
          inputErrorsTranslations,
          errors,
          'description',
        )}
      />
      <FormField
        component={Input}
        fieldName="description"
        label={retrieveFieldTranslation<CreateOrganizationFormValues>(
          formTranslations,
          'description',
          'label',
        )}
        placeholder={retrieveFieldTranslation<CreateOrganizationFormValues>(
          formTranslations,
          'description',
          'placeholder',
        )}
        control={control}
        rules={CREATE_ORGANIZATION_FORM_RULES.description}
        error={retrieveErrorTranslation<CreateOrganizationFormValues>(
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

export default CreateOrganizationForm;
