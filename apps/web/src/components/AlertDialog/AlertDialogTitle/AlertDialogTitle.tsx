"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utilities/classnames";
import { Title } from "@radix-ui/react-alert-dialog";

type AlertDialogTitleProps = ComponentPropsWithoutRef<typeof Title>;

type AlertDialogTitleRef = ElementRef<typeof Title>;

const AlertDialogTitle = forwardRef<AlertDialogTitleRef, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
);

AlertDialogTitle.displayName = Title.displayName;

export default AlertDialogTitle;
