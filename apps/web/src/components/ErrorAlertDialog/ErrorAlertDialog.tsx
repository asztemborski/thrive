import { useTranslations } from "next-intl";

import { ERROR_ALERT_DIALOG_MESSAGES } from "@/constants/translations";

import AlertDialog, {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../AlertDialog";

type ErrorAlertDialogProps = {
  isOpen: boolean;
  onContinue: () => void;
  errorMessage: string;
};

const ErrorAlertDialog = ({
  isOpen,
  onContinue,
  errorMessage,
}: ErrorAlertDialogProps) => {
  const t = useTranslations(ERROR_ALERT_DIALOG_MESSAGES);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <p>{errorMessage}</p>
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

export default ErrorAlertDialog;
