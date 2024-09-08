import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog';

import { Workspace } from '@/components/SideBar';
import { useTranslations } from 'next-intl';
import { CREATE_WORKSPACE_DIALOG_MESSAGES } from '@/constants/translations';
import CreateWorkspaceForm from '@/forms/CreateWorkspaceForm/CreateWorkspaceForm';

type CreateWorkspaceDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (createdOrganization: Workspace) => void;
};

export default function CreateWorkspaceDialog({
  isOpen,
  onOpenChange,
  onCreated,
}: CreateWorkspaceDialogProps) {
  const onCreationSuccess = (createdWorkspace: Workspace) => {
    onOpenChange(false);
    onCreated(createdWorkspace);
  };

  const t = useTranslations(CREATE_WORKSPACE_DIALOG_MESSAGES);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm onSuccess={onCreationSuccess} />
      </DialogContent>
    </Dialog>
  );
}
