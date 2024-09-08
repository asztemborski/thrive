import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import React from 'react';
import { AvatarProps } from '@/components/Avatar/Avatar';

type WorkspaceAvatarProps = AvatarProps & {
  name: string;
  iconUrl: string | null;
};

const WorkspaceAvatar = ({ name, iconUrl, ...props }: WorkspaceAvatarProps) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={iconUrl ?? undefined} alt="workspace name" />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
