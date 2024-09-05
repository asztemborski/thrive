import { CreateOrganizationFormValues } from '@/forms/CreateOrganizationForm/CreateOrganizationForm';
import { ERROR_MESSAGES } from '@/containers/ErrorMessagesProvider/ErrorMessagesProvider';
import { FormRules } from '@/utilities/form';

const CREATE_ORGANIZATION_FORM_RULES: FormRules<CreateOrganizationFormValues> = {
  name: {
    required: {
      value: true,
      message: ERROR_MESSAGES.required,
    },
  },
  description: {
    required: {
      value: true,
      message: ERROR_MESSAGES.required,
    },
  },
};

export default CREATE_ORGANIZATION_FORM_RULES;
