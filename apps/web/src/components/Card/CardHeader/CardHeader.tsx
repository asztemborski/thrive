import { forwardRef } from "react";

import { cn } from "@/utilities/classnames";

type CardHeaderProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(["flex flex-col space-y-1.5 p-6", className])}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

export default CardHeader;
