import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/Dialog';
import CreateCategoryForm from '@/forms/CreateCategoryForm/CreateCategoryForm';
import { Category } from '@/components/ThreadsTree';

type CreateCategoryDialogProps = {
  workspaceId: string;
  onSuccess?: (createdCategory: Category) => void;
  parentCategoryId?: string;
};

export default function CreateCategoryDialog({
  workspaceId,
  onSuccess,
  parentCategoryId,
}: CreateCategoryDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create category</DialogTitle>
        <DialogDescription>Fill the data below to create your category</DialogDescription>
      </DialogHeader>
      <div>
        <CreateCategoryForm
          workspaceId={workspaceId}
          onSuccess={onSuccess}
          parentCategoryId={parentCategoryId}
        />
      </div>
    </DialogContent>
  );
}
