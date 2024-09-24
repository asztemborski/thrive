import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/Dialog';

import CreateThreadForm from '@/forms/CreateThreadForm/CreateThreadForm';
import { Thread } from '@/components/ThreadsTree';

type CreateThreadDialogProps = {
  workspaceId: string;
  onSuccess?: (createdThread: Thread) => void;
  categoryId?: string;
};

export default function CreateThreadDialog({
  workspaceId,
  onSuccess,
  categoryId,
}: CreateThreadDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create thread</DialogTitle>
        <DialogDescription>Fill the data below to create your thread</DialogDescription>
      </DialogHeader>
      <div>
        <CreateThreadForm workspaceId={workspaceId} onSuccess={onSuccess} categoryId={categoryId} />
      </div>
    </DialogContent>
  );
}
