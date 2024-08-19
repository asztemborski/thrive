import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { ReactNode } from "react";

type MessagesProviderProps = {
  children: ReactNode;
  namespaces: (keyof AbstractIntlMessages)[];
};

const MessagesProvider = ({ children, namespaces }: MessagesProviderProps) => {
  const messages = useMessages();

  const filteredMessages = Object.fromEntries(
    Object.entries(messages).filter(([key]) => namespaces.includes(key))
  );

  return (
    <NextIntlClientProvider messages={filteredMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default MessagesProvider;
