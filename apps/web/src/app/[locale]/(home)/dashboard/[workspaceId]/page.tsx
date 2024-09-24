import collaborationApiClient from '@/api/collaboration/collaborationApiClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/Dropdown';
import Button from '@/components/Button';

import { ChevronDown } from 'react-feather';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/Resizable';
import {
  IconBell,
  IconDoorExit,
  IconSearch,
  IconSettings,
  IconUserPlus,
} from '@tabler/icons-react';

import MessagesProvider from '@/containers/MessagesProvider';
import { INPUT_ERROR_MESSAGES } from '@/constants/translations';
import ThreadsTree from '@/components/ThreadsTree/ThreadsTree';

type WorkspaceDashboardPageProps = {
  params: { workspaceId: string };
};

export default async function WorkspaceDashboardPage({ params }: WorkspaceDashboardPageProps) {
  const { workspaceId } = params;

  const [workspace, workspaceThreads] = await Promise.all([
    collaborationApiClient.getWorkspaceRequest(workspaceId),
    collaborationApiClient.getWorkspaceThreadsRequest(workspaceId),
  ]);

  return (
    <div className="flex  h-full ">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={15}
          defaultSize={20}
          className="bg-black flex flex-col relative h-full"
        >
          <DropdownMenu>
            <div className="flex flex-row w-full">
              <DropdownMenuTrigger className="w-full">
                <Button
                  variant="ghost"
                  className="bg-black rounded-none justify-between items-center flex w-full flex-1"
                >
                  <div className="flex flex-row items-center justify-center">
                    <span className="text-lg">{workspace.name}</span>
                    <ChevronDown size={15} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <Button variant="ghost" className="rounded-none flex">
                <IconSearch size={15} />
              </Button>
            </div>
            <DropdownMenuContent className=" bg-black  ">
              <DropdownMenuLabel>{workspace.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconSettings className="mr-2 text-gray-300" strokeWidth={1.5} />
                <span className="text-gray-300">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconUserPlus className="mr-2 text-gray-300" strokeWidth={1.5} />
                <span className="text-gray-300">Invite users</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconBell className="mr-2 text-gray-300" strokeWidth={1.5} />
                <span className="text-gray-300">Notification settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconDoorExit className="mr-2  text-red-800" strokeWidth={1.5} />
                <span className="text-red-700">Leave</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <MessagesProvider namespaces={[INPUT_ERROR_MESSAGES]}>
            <ThreadsTree
              workspaceId={workspace.id}
              categories={workspaceThreads.categories}
              threads={workspaceThreads.threads}
            />
          </MessagesProvider>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="bg-[#101214]" minSize={80}></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
