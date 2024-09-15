import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog';
import Button from '@/components/Button';
import CreateThreadForm from '@/forms/CreateThreadForm/CreateThreadForm';

type CreateThreadDialogProps = {
  workspaceId: string;
};

export default function CreateThreadDialog({ workspaceId }: CreateThreadDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add thread</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create thread</DialogTitle>
          <DialogDescription>Fill the data below to create your thread</DialogDescription>
        </DialogHeader>
        <div>
          <CreateThreadForm workspaceId={workspaceId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
