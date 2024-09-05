'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/classnames';

export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

type AvatarRef = ElementRef<typeof AvatarPrimitive.Root>;

const Avatar = forwardRef<AvatarRef, AvatarProps>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
