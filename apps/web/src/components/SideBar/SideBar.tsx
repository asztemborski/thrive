'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';

import {
  IconMessageCircle,
  IconBell,
  IconUsers,
  IconAdjustmentsHorizontal,
  IconLogout,
  IconLayout,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { Link } from '@/libs/navigation';

import { usePathname } from '@/libs/navigation';

import identityApiClient from '@/api/identity/identityApiClient';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import SideBarButton from '@/components/SideBarButton/SideBarButton';

const SideNavigationBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [expand, setExpand] = useState(false);

  const onLogoutClick = async () => {
    await identityApiClient.logoutRequest();
  };

  const onExpandClick = () => {
    setExpand((prevState) => !prevState);
  };

  useEffect(() => {
    if (session?.error) void signOut();
  }, [session, pathname]);

  return (
    <nav className="h-full bg-black flex flex-col items-center pt-5 justify-between">
      <div className="flex flex-col items-center ">
        <Avatar className="mb-5 hover:cursor-pointer">
          <AvatarImage src={undefined} alt="username" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Link href="/dashboard" className="w-full">
          <SideBarButton
            name="Dashboard"
            expanded={expand}
            isActive={pathname === '/dashboard'}
            icon={<IconLayout strokeWidth={1.5} />}
          />
        </Link>
        <Link href="/messages" className="w-full">
          <SideBarButton
            name="Messages"
            expanded={expand}
            isActive={pathname === '/messages'}
            icon={<IconMessageCircle strokeWidth={1.5} />}
          />
        </Link>
        <Link href="/notifications" className="w-full">
          <SideBarButton
            name="Notifications"
            expanded={expand}
            isActive={pathname === '/notifications'}
            icon={<IconBell strokeWidth={1.5} />}
          />
        </Link>
        <Link href="/contacts" className="w-full">
          <SideBarButton
            name="Contacts"
            expanded={expand}
            isActive={pathname === '/contacts'}
            icon={<IconUsers strokeWidth={1.5} />}
          />
        </Link>
        <Link href="settings" className="w-full">
          <SideBarButton
            name="Settings"
            expanded={expand}
            isActive={pathname === '/settings'}
            icon={<IconAdjustmentsHorizontal strokeWidth={1.5} />}
          />
        </Link>
      </div>
      <div className="flex w-full flex-col ">
        <Button
          variant="ghost"
          className="px-5 py-7 justify-normal w-full flex border-transparent border-2 gap-2"
          onClick={onExpandClick}
          style={{ color: 'gray' }}
        >
          {expand ? <IconChevronLeft /> : <IconChevronRight />}
        </Button>

        <SideBarButton
          name="Log out"
          expanded={expand}
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
    <SessionProvider refetchInterval={250}>
      <SideNavigationBar />
    </SessionProvider>
  );
}
