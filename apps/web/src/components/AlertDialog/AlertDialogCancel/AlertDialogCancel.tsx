"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { buttonVariants } from "@/components/Button";
import { cn } from "@/utilities/classnames";
import { Cancel } from "@radix-ui/react-alert-dialog";

type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof Cancel>;

type AlertDialogCancelRef = ElementRef<typeof Cancel>;

const AlertDialogCancel = forwardRef<
  AlertDialogCancelRef,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => (
  <Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
));

AlertDialogCancel.displayName = Cancel.displayName;

export default AlertDialogCancel;
