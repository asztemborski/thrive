'use client';

import { Tree, UncontrolledTreeEnvironment } from 'react-complex-tree';
import ScrollArea from '../ScrollArea/ScrollArea';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ContextMenu';
import { Dialog, DialogTrigger } from '@/components/Dialog';
import CreateCategoryDialog from '@/components/CreateCategoryDialog/CreateCategoryDialog';
import { useMemo, useState } from 'react';
import ThreadsTreeItemArrow from '@/components/ThreadsTree/ThreadsTreeItemArrow/ThreadsTreeItemArrow';
import ThreadsTreeItem from '@/components/ThreadsTree/ThreadsTreeItem/ThreadsTreeItem';
import CreateThreadDialog from '@/components/CreateThreadDIalog/CreateThreadDialog';
import { TreeDataProvider } from '@/components/ThreadsTree/treeDataProvider';
import ThreadsTreeContainer from '@/components/ThreadsTree/ThreadsTreeContainer/ThreadsTreeContainer';

export type Category = {
  id: string;
  name: string;
  parentCategoryId?: string;
};

export type Thread = {
  id: string;
  name: string;
  categoryId?: string;
};

type ThreadsTreeProps = {
  workspaceId: string;
  categories: Category[];
  threads: Thread[];
};

export default function ThreadsTree({ workspaceId, categories, threads }: ThreadsTreeProps) {
  const [displayDialog, setDisplayDialog] = useState<'ADD_THREAD' | 'ADD_CATEGORY' | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const treeDataProvider = useMemo(
    () => new TreeDataProvider(threads, categories),
    [categories, threads],
  );

  const onCategoryCreate = (createdCategory: Category) => {
    treeDataProvider.addCategory(createdCategory);
    setDisplayDialog(undefined);
    setCategoryId(undefined);
  };

  const onThreadCreate = (createdThread: Thread) => {
    treeDataProvider.addThread(createdThread);
    setDisplayDialog(undefined);
    setCategoryId(undefined);
  };

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col flex-1">
          <ScrollArea className="flex flex-col flex-1">
            <UncontrolledTreeEnvironment
              dataProvider={treeDataProvider}
              getItemTitle={(item) => item.data.name}
              viewState={{}}
              canDragAndDrop={true}
              canDropOnFolder={true}
              renderItemTitle={({ title }) => <span>{title}</span>}
              renderItemArrow={({ item, context }) =>
                item.isFolder ? (
                  <ThreadsTreeItemArrow isExpanded={context.isExpanded} {...context.arrowProps} />
                ) : null
              }
              renderItem={({ children, ...props }) => (
                <ThreadsTreeItem
                  setDisplayDialog={setDisplayDialog}
                  setCategoryId={setCategoryId}
                  {...props}
                >
                  {children}
                </ThreadsTreeItem>
              )}
              renderTreeContainer={({ children, containerProps }) => (
                <ThreadsTreeContainer
                  setDisplayDialog={setDisplayDialog}
                  containerProps={containerProps}
                >
                  {children}
                </ThreadsTreeContainer>
              )}
              renderItemsContainer={({ children, containerProps }) => (
                <ul className="w-full flex flex-col gap-1" {...containerProps}>
                  {children}
                </ul>
              )}
            >
              <Tree treeId="tree-1" rootItem="root" />
            </UncontrolledTreeEnvironment>
          </ScrollArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <DialogTrigger>Add category</DialogTrigger>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {displayDialog === 'ADD_THREAD' && (
        <CreateThreadDialog
          workspaceId={workspaceId}
          onSuccess={onThreadCreate}
          categoryId={categoryId}
        />
      )}
      {displayDialog === 'ADD_CATEGORY' && (
        <CreateCategoryDialog
          workspaceId={workspaceId}
          onSuccess={onCategoryCreate}
          parentCategoryId={categoryId}
        />
      )}
    </Dialog>
  );
}
