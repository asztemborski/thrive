import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog';
import CreateOrganizationForm from '@/forms/CreateOrganizationForm/CreateOrganizationForm';
import { Organization } from '@/components/SideBar';
import { useTranslations } from 'next-intl';
import { CREATE_ORGANIZATION_DIALOG_MESSAGES } from '@/constants/translations';

type CreateOrganizationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (createdOrganization: Organization) => void;
};

export default function CreateOrganizationDialog({
  isOpen,
  onOpenChange,
  onCreated,
}: CreateOrganizationDialogProps) {
  const onCreationSuccess = (createdOrganization: Organization) => {
    onOpenChange(false);
    onCreated(createdOrganization);
  };

  const t = useTranslations(CREATE_ORGANIZATION_DIALOG_MESSAGES);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm onSuccess={onCreationSuccess} />
      </DialogContent>
    </Dialog>
  );
}
