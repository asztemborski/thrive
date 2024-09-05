import { Avatar, AvatarFallback } from '@/components/Avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

import { IconLogin, IconPlus } from '@tabler/icons-react';
import Button from '@/components/Button';
import OrganizationAvatar from '@/components/OrganizationAvatar/OrganizationAvatar';
import React from 'react';
import Separator from '@/components/Separator';
import ScrollArea from '@/components/ScrollArea/ScrollArea';
import { useTranslations } from 'next-intl';
import { ORGANIZATION_SELECT_MENU_MESSAGES } from '@/constants/translations';

type Organization = {
  id: string;
  name: string;
  iconUrl: string | null;
};

type OrganizationSelectMenuProps = {
  organizations: Organization[];
  currentOrganization: Organization | undefined;
  onCreateClick: () => void;
};

const OrganizationSelectMenu = ({
  organizations,
  currentOrganization,
  onCreateClick,
}: OrganizationSelectMenuProps) => {
  const t = useTranslations(ORGANIZATION_SELECT_MENU_MESSAGES);

  return (
    <Popover>
      <PopoverTrigger>
        {currentOrganization && (
          <OrganizationAvatar
            name={currentOrganization.name}
            iconUrl={currentOrganization.iconUrl}
          />
        )}
        {!currentOrganization && (
          <Avatar>
            <AvatarFallback>
              <IconPlus strokeWidth={1.5} />
            </AvatarFallback>
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={17} collisionPadding={5}>
        <nav className="flex flex-col gap-1">
          <ScrollArea className="flex h-auto max-h-[250px] flex-col overflow-y-auto ">
            {organizations.map(({ id, name, iconUrl }) => (
              <div key={id} className="flex flex-col ">
                <Button variant="ghost" className="justify-normal px-1 mb-1 mr-3">
                  <div className="flex flex-row items-center gap-2">
                    <OrganizationAvatar className="h-9 w-9" name={name} iconUrl={iconUrl} />
                    <span className="text-sm">{name}</span>
                  </div>
                </Button>
              </div>
            ))}
          </ScrollArea>
          {organizations.length > 0 && <Separator />}
          <Button variant="ghost" className="justify-normal px-2 mb-1">
            <div className="flex flex-row gap-2">
              <IconLogin strokeWidth={1.5} />
              <span>{t('join')}</span>
            </div>
          </Button>
          <Button onClick={onCreateClick} variant="ghost" className="justify-normal px-2 mb-1">
            <div className="flex flex-row gap-2">
              <IconPlus strokeWidth={1.5} />
              <span>{t('create')}</span>
            </div>
          </Button>
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationSelectMenu;
