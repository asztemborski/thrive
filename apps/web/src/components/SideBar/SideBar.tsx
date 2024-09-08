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
import React, { useEffect, useState } from 'react';
import SideBarButton from '@/components/SideBarButton/SideBarButton';
import organizationApiClient from '@/api/organization/organizationApiClient';
import OrganizationSelectMenu from '@/components/OrganizationSelectMenu/OrganizationSelectMenu';
import CreateOrganizationDialog from '@/components/CreateOrganizationDialog/CreateOrganizationDialog';
import { DEFAULT_AUTHENTICATED_ROUTE } from '@/constants/routes';

export type Organization = {
  id: string;
  name: string;
  description: string;
  iconUrl: string | null;
};

const SideNavigationBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string | undefined>();

  const [showCreateOrganizationDialog, setShowCreateOrganizationDialog] = useState(false);
  const router = useRouter();

  const onCreateOrganizationClick = () => {
    setShowCreateOrganizationDialog(true);
  };

  const onShowCreateOrganizationDialogChange = (show: boolean) => {
    setShowCreateOrganizationDialog(show);
  };

  const onLogoutClick = async () => {
    await identityApiClient.logoutRequest();
  };

  const onOrganizationCreated = async (createdOrganization: Organization) => {
    setOrganizations((prevState) => [...prevState, createdOrganization]);
    router.push(`/dashboard/${createdOrganization.id}`);
  };

  const onOrganizationSelect = (organization: Organization) => {
    router.push(`/dashboard/${organization.id}`);
  };

  useEffect(() => {
    const fetchUserOrganizations = async (): Promise<void> => {
      const response = await organizationApiClient.getOrganizationsRequest();
      setOrganizations(response);
      setIsLoading(false);
    };

    void fetchUserOrganizations();
  }, []);

  useEffect(() => {
    if (!pathname.includes(`${DEFAULT_AUTHENTICATED_ROUTE}/`)) return;

    const id = pathname.split('/')[2];
    setCurrentOrganizationId(id);
  }, [pathname]);

  const currentOrganization = organizations.find(
    (organization) => organization.id === currentOrganizationId,
  );

  return (
    <nav className="h-full bg-black flex flex-col items-center pt-5 justify-between border-r border-bg-border ">
      <CreateOrganizationDialog
        isOpen={showCreateOrganizationDialog}
        onOpenChange={onShowCreateOrganizationDialogChange}
        onCreated={onOrganizationCreated}
      />
      <div className="flex flex-col items-center ">
        <OrganizationSelectMenu
          organizations={organizations}
          currentOrganization={currentOrganization}
          onCreateClick={onCreateOrganizationClick}
          onSelect={onOrganizationSelect}
        />
        <Link
          href={currentOrganization ? `/dashboard/${currentOrganization.id}` : '/dashboard'}
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
