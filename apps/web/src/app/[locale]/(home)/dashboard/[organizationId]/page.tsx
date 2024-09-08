import organizationApiClient from '@/api/organization/organizationApiClient';
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
import Separator from '@/components/Separator';
import { IconBell, IconDoorExit, IconSettings, IconUserPlus } from '@tabler/icons-react';

type OrganizationDashboardPageProps = {
  params: { organizationId: string };
};

export default async function OrganizationDashboardPage({
  params,
}: OrganizationDashboardPageProps) {
  const organization = await organizationApiClient.getOrganizationRequest(params.organizationId);

  return (
    <div className="flex  h-full ">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={12} defaultSize={12} className="bg-black">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="bg-black rounded-none justify-between items-center flex w-full"
              >
                <span className="text-md">{organization.name}</span>
                <ChevronDown size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-black  ">
              <DropdownMenuLabel>{organization.name}</DropdownMenuLabel>
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
          <Separator />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="bg-[#101214]" minSize={70}>
          Essa
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
