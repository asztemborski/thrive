'use client';

import {
  IconMessageCircle,
  IconBell,
  IconUsers,
  IconAdjustmentsHorizontal,
  IconLogout,
  IconLayout,
} from '@tabler/icons-react';
import { Link, useRouter } from '@/libs/navigation';

import { usePathname } from '@/libs/navigation';

import identityApiClient from '@/api/identity/identityApiClient';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import SideBarButton from '@/components/SideBarButton/SideBarButton';
import collaborationApiClient from '@/api/collaboration/collaborationApiClient';

import { DEFAULT_AUTHENTICATED_ROUTE } from '@/constants/routes';
import CreateWorkspaceDialog from '@/components/CreateWorkspaceDialog/CreateWorkspaceDialog';
import WorkspaceSelectMenu from '@/components/WorkspaceSelectMenu/WorkspaceSelectMenu';

export type Workspace = {
  id: string;
  name: string;
  description: string;
};

const SideNavigationBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | undefined>();

  const [showCreateWorkspaceDialog, setShowCreateWorkspaceDialog] = useState(false);
  const router = useRouter();

  const onCreateWorkspaceClick = () => {
    setShowCreateWorkspaceDialog(true);
  };

  const onShowCreateWorkspaceDialogChange = (show: boolean) => {
    setShowCreateWorkspaceDialog(show);
  };

  const onLogoutClick = async () => {
    await identityApiClient.logoutRequest();
  };

  const onWorkspaceCreated = async (createdWorkspace: Workspace) => {
    setWorkspaces((prevState) => [...prevState, createdWorkspace]);
    router.push(`/dashboard/${createdWorkspace.id}`);
  };

  const onWorkspaceSelect = (workspace: Workspace) => {
    router.push(`/dashboard/${workspace.id}`);
  };

  useEffect(() => {
    const fetchUserWorkspaces = async (): Promise<void> => {
      const response = await collaborationApiClient.getWorkspacesRequest();
      setWorkspaces(response);
      setIsLoading(false);
    };

    void fetchUserWorkspaces();
  }, []);

  useEffect(() => {
    if (!pathname.includes(`${DEFAULT_AUTHENTICATED_ROUTE}/`)) return;

    const id = pathname.split('/')[2];
    setCurrentWorkspaceId(id);
  }, [pathname]);

  const logout = useCallback(async () => {
    await signOut();
  }, [router, session]);

  useEffect(() => {
    if (session?.error) {
      void logout();
    }
  }, [session, logout]);

  const currentWorkspace = workspaces.find((workspace) => workspace.id === currentWorkspaceId);

  return (
    <nav className="h-full bg-black flex flex-col items-center pt-5 justify-between border-r border-bg-border ">
      <CreateWorkspaceDialog
        isOpen={showCreateWorkspaceDialog}
        onOpenChange={onShowCreateWorkspaceDialogChange}
        onCreated={onWorkspaceCreated}
      />
      <div className="flex flex-col items-center ">
        <WorkspaceSelectMenu
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
          onCreateClick={onCreateWorkspaceClick}
          onSelect={onWorkspaceSelect}
          isLoading={isLoading}
        />
        <Link
          href={currentWorkspace ? `/dashboard/${currentWorkspace.id}` : '/dashboard'}
          className="w-full mt-5"
        >
          <SideBarButton
            isActive={pathname.includes('/dashboard')}
            icon={<IconLayout strokeWidth={1.5} />}
          />
        </Link>
        <Link href="/messages" className="w-full">
          <SideBarButton
            isActive={pathname === '/messages'}
            icon={<IconMessageCircle strokeWidth={1.5} />}
          />
        </Link>
        <Link href="/notifications" className="w-full">
          <SideBarButton
            isActive={pathname === '/notifications'}
            icon={<IconBell strokeWidth={1.5} />}
          />
        </Link>
        <Link href="/contacts" className="w-full">
          <SideBarButton
            isActive={pathname === '/contacts'}
            icon={<IconUsers strokeWidth={1.5} />}
          />
        </Link>
        <Link href="settings" className="w-full">
          <SideBarButton
            isActive={pathname === '/settings'}
            icon={<IconAdjustmentsHorizontal strokeWidth={1.5} />}
          />
        </Link>
      </div>
      <div className="flex w-full flex-col ">
        <SideBarButton
          isActive={false}
          onClick={onLogoutClick}
          icon={<IconLogout strokeWidth={1.5} />}
        />
      </div>
    </nav>
  );
};

export default function SideBar() {
  return (
    <SessionProvider>
      <SideNavigationBar />
    </SessionProvider>
  );
}
