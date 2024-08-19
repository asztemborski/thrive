import { forwardRef } from "react";

import { cn } from "@/utilities/classnames";

type CardFooterProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(["flex items-center p-6 pt-0", className])}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export default CardFooter;
