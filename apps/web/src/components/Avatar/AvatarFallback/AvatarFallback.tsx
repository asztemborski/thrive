'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/classnames';

type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

type AvatarFallbackRef = ElementRef<typeof AvatarPrimitive.Fallback>;

const AvatarFallback = forwardRef<AvatarFallbackRef, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted',
          className,
        )}
        {...props}
      />
    );
  },
);

AvatarFallback.displayName = 'AvatarFallback';

export default AvatarFallback;
