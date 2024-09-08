import { ERROR_MESSAGES } from '@/containers/ErrorMessagesProvider/ErrorMessagesProvider';
import { FormRules } from '@/utilities/form';
import { CreateWorkspaceFormValues } from '@/forms/CreateWorkspaceForm/CreateWorkspaceForm';

const CREATE_WORKSPACE_FORM_RULES: FormRules<CreateWorkspaceFormValues> = {
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

export default CREATE_WORKSPACE_FORM_RULES;
