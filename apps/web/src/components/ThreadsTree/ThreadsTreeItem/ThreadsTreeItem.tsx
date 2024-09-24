import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { TreeItemRenderContext } from 'react-complex-tree';
import Button from '@/components/Button';
import { IconPlus } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Dropdown';
import { DialogTrigger } from '@/components/Dialog';

type ThreadsTreeItemProps = {
  title: ReactNode;
  arrow: ReactNode;
  depth: number;
  context: TreeItemRenderContext;
  children: ReactNode;
  setDisplayDialog: Dispatch<SetStateAction<'ADD_THREAD' | 'ADD_CATEGORY' | undefined>>;
  setCategoryId: Dispatch<SetStateAction<string | undefined>>;
};

export default function ThreadsTreeItem({
  title,
  arrow,
  depth,
  context,
  children,
  setDisplayDialog,
  setCategoryId,
}: ThreadsTreeItemProps) {
  const InteractiveComponent = context.isRenaming ? 'div' : 'button';

  const onCreateThreadClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setDisplayDialog('ADD_THREAD');
    setCategoryId((context.interactiveElementProps as any)['data-rct-item-id']);
  };

  const onCreateCategoryClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setDisplayDialog('ADD_CATEGORY');
    setCategoryId((context.interactiveElementProps as any)['data-rct-item-id']);
  };

  return (
    <li {...context.itemContainerWithChildrenProps} className="m-0 flex flex-col  items-start">
      <InteractiveComponent
        {...context.itemContainerWithoutChildrenProps}
        {...context.interactiveElementProps}
        type="button"
        className="flex flex-row items-center w-full"
        style={{ paddingLeft: 15 * depth }}
      >
        <Button
          variant="ghost"
          className={`bg-${context.isSelected ? 'secondary' : 'black'} justify-between items-center h-7 rounded-[5px] flex w-full flex-1`}
        >
          <div className="flex flex-row items-center gap-1">
            {arrow} {title}
          </div>
          {arrow && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                  <IconPlus size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                  <DialogTrigger onClick={onCreateThreadClicked}>
                    <DropdownMenuItem>Add Thread</DropdownMenuItem>
                  </DialogTrigger>
                  {depth < 1 && (
                    <DialogTrigger onClick={onCreateCategoryClicked}>
                      <DropdownMenuItem>Add Category</DropdownMenuItem>
                    </DialogTrigger>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </Button>
      </InteractiveComponent>
      {children}
    </li>
  );
}
