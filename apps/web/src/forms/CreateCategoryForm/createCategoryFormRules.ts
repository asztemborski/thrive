import { FormRules } from '@/utilities/form';
import { ERROR_MESSAGES } from '@/containers/ErrorMessagesProvider/ErrorMessagesProvider';
import { CreateCategoryFormValues } from '@/forms/CreateCategoryForm/CreateCategoryForm';

const CREATE_CATEGORY_FORM_RULES: FormRules<CreateCategoryFormValues> = {
  name: {
    required: {
      value: true,
      message: ERROR_MESSAGES.required,
    },
  },
};

export default CREATE_CATEGORY_FORM_RULES;
