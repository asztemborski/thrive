"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utilities/classnames";
import { Overlay } from "@radix-ui/react-alert-dialog";

type AlertDialogOverlayProps = ComponentPropsWithoutRef<typeof Overlay>;

type AlertDialogOverlayRef = ElementRef<typeof Overlay>;

const AlertDialogOverlay = forwardRef<
  AlertDialogOverlayRef,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));

AlertDialogOverlay.displayName = Overlay.displayName;

export default AlertDialogOverlay;
