"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utilities/classnames";
import { Root } from "@radix-ui/react-separator";

type SeparatorProps = ComponentPropsWithoutRef<typeof Root>;

type SeparatorRef = ElementRef<typeof Root>;

const Separator = forwardRef<SeparatorRef, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    return (
      <Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
      />
    );
  }
);

Separator.displayName = Root.displayName;

export default Separator;
