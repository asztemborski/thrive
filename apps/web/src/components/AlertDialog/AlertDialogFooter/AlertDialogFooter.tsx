"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/utilities/classnames";

type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

AlertDialogFooter.displayName = "AlertDialogFooter";

export default AlertDialogFooter;
