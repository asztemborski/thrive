"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { buttonVariants } from "@/components/Button";
import { cn } from "@/utilities/classnames";
import { Action } from "@radix-ui/react-alert-dialog";

type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof Action>;

type AlertDialogCancelRef = ElementRef<typeof Action>;

const AlertDialogAction = forwardRef<
  AlertDialogCancelRef,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => (
  <Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));

AlertDialogAction.displayName = Action.displayName;

export default AlertDialogAction;
