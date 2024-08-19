"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utilities/classnames";
import { Description } from "@radix-ui/react-alert-dialog";

type AlertDialogDescriptionProps = ComponentPropsWithoutRef<typeof Description>;

type AlertDialogDescriptionRef = ElementRef<typeof Description>;

const AlertDialogDescription = forwardRef<
  AlertDialogDescriptionRef,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

AlertDialogDescription.displayName = Description.displayName;

export default AlertDialogDescription;
