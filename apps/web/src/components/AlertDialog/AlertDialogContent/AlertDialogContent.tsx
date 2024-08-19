"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utilities/classnames";
import { Content } from "@radix-ui/react-alert-dialog";

import { AlertDialogOverlay, AlertDialogPortal } from "../";

type AlertDialogContentProps = ComponentPropsWithoutRef<typeof Content>;

type AlertDialogContentRef = ElementRef<typeof Content>;

const AlertDialogContent = forwardRef<
  AlertDialogContentRef,
  AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <Content
      ref={ref}
      className={cn(
        `fixed left-[50%] top-[50%]  z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border
         bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out
         data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
         data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2
         data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2
         data-[state=open]:slide-in-from-top-[48%] sm:rounded-[5px]`,
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));

AlertDialogContent.displayName = Content.displayName;

export default AlertDialogContent;
