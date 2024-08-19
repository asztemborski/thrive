'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/classnames';

type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

type AvatarImageRef = ElementRef<typeof AvatarPrimitive.Image>;

const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  );
});

AvatarImage.displayName = 'AvatarImage';

export default AvatarImage;
