import { useTranslations } from "next-intl";
import Image from "next/image";

import { EMAIL_CONFIRM_DIALOG_MESSAGES } from "@/constants/translations";

import AlertDialog, {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../AlertDialog";

type ConfirmEmailAlertDialogProps = {
  isOpen: boolean;
  onContinue: () => void;
};

const ConfirmEmailAlertDialog = ({
  isOpen,
  onContinue,
}: ConfirmEmailAlertDialogProps) => {
  const t = useTranslations(EMAIL_CONFIRM_DIALOG_MESSAGES);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className=" space-y-5">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-center justify-center space-y-10">
              <p>{t("description")}</p>
              <Image
                src="/images/mail-sent.svg"
                alt=""
                width="200"
                height="200"
                className="hidden lg:block"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onContinue} className="px-10 font-bold">
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmEmailAlertDialog;
