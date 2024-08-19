"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/utilities/classnames";

type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>;

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

AlertDialogHeader.displayName = "AlertDialogHeader";

export default AlertDialogHeader;
