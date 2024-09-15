import { Avatar, AvatarFallback } from '@/components/Avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

import { IconLogin, IconPlus } from '@tabler/icons-react';
import Button from '@/components/Button';

import React from 'react';
import Separator from '@/components/Separator';
import ScrollArea from '@/components/ScrollArea/ScrollArea';
import { useTranslations } from 'next-intl';
import { WORKSPACE_SELECT_MENU_MESSAGES } from '@/constants/translations';
import WorkspaceAvatar from '@/components/WorkspaceAvatar/WorkspaceAvatar';

type Workspace = {
  id: string;
  name: string;
  description: string;
};

type WorkspaceSelectMenuProps = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | undefined;
  onCreateClick: () => void;
  onSelect: (selectedWorkspace: Workspace) => void;
  isLoading: boolean;
};

const WorkspaceSelectMenu = ({
  workspaces,
  currentWorkspace,
  onCreateClick,
  onSelect,
  isLoading,
}: WorkspaceSelectMenuProps) => {
  const t = useTranslations(WORKSPACE_SELECT_MENU_MESSAGES);

  return (
    <Popover>
      <PopoverTrigger>
        {currentWorkspace && !isLoading && (
          <WorkspaceAvatar name={currentWorkspace.name} iconUrl={null} />
        )}
        {!currentWorkspace && !isLoading && (
          <Avatar>
            <AvatarFallback>
              <IconPlus strokeWidth={1.5} />
            </AvatarFallback>
          </Avatar>
        )}
        {isLoading && (
          <Avatar>
            <AvatarFallback className="animate-pulse" />
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={17} collisionPadding={5}>
        <nav className="flex flex-col gap-1">
          <ScrollArea className="flex h-auto max-h-[265px] flex-col overflow-y-auto ">
            {workspaces.map((workspace) => (
              <div key={workspace.id} className="flex flex-col ">
                <Button
                  onClick={() => onSelect(workspace)}
                  variant="ghost"
                  className="justify-normal px-1 mb-1 mr-3"
                >
                  <div className="flex flex-row items-center gap-2">
                    <WorkspaceAvatar className="h-9 w-9" name={workspace.name} iconUrl={null} />
                    <span className="text-sm">{workspace.name}</span>
                  </div>
                </Button>
              </div>
            ))}
          </ScrollArea>
          {workspaces.length > 0 && <Separator />}
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

export default WorkspaceSelectMenu;
