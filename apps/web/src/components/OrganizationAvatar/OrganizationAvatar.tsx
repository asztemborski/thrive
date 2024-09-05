import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import React from 'react';
import { AvatarProps } from '@/components/Avatar/Avatar';

type OrganizationAvatarProps = AvatarProps & {
  name: string;
  iconUrl: string | null;
};

const OrganizationAvatar = ({ name, iconUrl, ...props }: OrganizationAvatarProps) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={iconUrl ?? undefined} alt="organization name" />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default OrganizationAvatar;
