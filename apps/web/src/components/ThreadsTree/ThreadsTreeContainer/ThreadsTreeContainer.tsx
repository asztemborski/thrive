import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Dropdown';
import Button from '@/components/Button';
import { IconPlus } from '@tabler/icons-react';
import { DialogTrigger } from '@/components/Dialog';

import { Dispatch, HTMLProps, ReactNode, SetStateAction } from 'react';

type ThreadsTreeContainerProps = {
  containerProps: HTMLProps<any>;
  children: ReactNode;
  setDisplayDialog: Dispatch<SetStateAction<'ADD_THREAD' | 'ADD_CATEGORY' | undefined>>;
};

export default function ThreadsTreeContainer({
  containerProps,
  children,
  setDisplayDialog,
}: ThreadsTreeContainerProps) {
  return (
    <div className="flex flex-col px-5 py-5">
      <div className="flex flex-row justify-between items-center">
        <DropdownMenu>
          <h2>Threads</h2>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="py-0 px-1">
              <IconPlus size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DialogTrigger>
              <DropdownMenuItem onClick={() => setDisplayDialog('ADD_THREAD')}>
                Add Thread
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger>
              <DropdownMenuItem onClick={() => setDisplayDialog('ADD_CATEGORY')}>
                Add Category
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div {...containerProps}>{children}</div>
    </div>
  );
}
