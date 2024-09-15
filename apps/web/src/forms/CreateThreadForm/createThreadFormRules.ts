import { FormRules } from '@/utilities/form';
import { CreateThreadFormValues } from '@/forms/CreateThreadForm/CreateThreadForm';
import { ERROR_MESSAGES } from '@/containers/ErrorMessagesProvider/ErrorMessagesProvider';

const CREATE_THREAD_FORM_RULES: FormRules<CreateThreadFormValues> = {
  name: {
    required: {
      value: true,
      message: ERROR_MESSAGES.required,
    },
  },
};

export default CREATE_THREAD_FORM_RULES;
