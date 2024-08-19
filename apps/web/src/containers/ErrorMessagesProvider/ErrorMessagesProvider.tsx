import { ReactNode } from "react";

import { INPUT_ERROR_MESSAGES } from "@/constants/translations";
import MessagesProvider from "@/containers/MessagesProvider";

export const ERROR_MESSAGES = {
  required: "required",
  minLength: "minLength",
  passwordMatch: "passwordMatch",
  invalidEmail: "invalidEmail",
};

type ErrorMessagesProviderProps = {
  children: ReactNode;
};

const ErrorMessagesProvider = ({ children }: ErrorMessagesProviderProps) => {
  return (
    <MessagesProvider namespaces={[INPUT_ERROR_MESSAGES]}>
      {children}
    </MessagesProvider>
  );
};

export default ErrorMessagesProvider;
