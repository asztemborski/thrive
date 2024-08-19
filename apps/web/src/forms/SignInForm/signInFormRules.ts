import { MAIL_REGEX } from "@/constants/regex";
import { ERROR_MESSAGES } from "@/containers/ErrorMessagesProvider/ErrorMessagesProvider";

import { FormRules } from "../SignUpForm/signUpFormRules";
import { SignInFormValues } from "./SignInForm";

const SIGNIN_FORM_RULES: FormRules<SignInFormValues> = {
  email: {
    required: {
      value: true,
      message: ERROR_MESSAGES.required,
    },
    pattern: {
      value: MAIL_REGEX,
      message: ERROR_MESSAGES.invalidEmail,
    },
  },
  password: {
    required: {
      value: true,
      message: ERROR_MESSAGES.required,
    },
  },
};

export default SIGNIN_FORM_RULES;
