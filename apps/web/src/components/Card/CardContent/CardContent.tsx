import { forwardRef } from "react";

import { cn } from "@/utilities/classnames";

type CardContentProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(["p-6 pt-0", className])} {...props} />
  )
);

CardContent.displayName = "CardContent";

export default CardContent;
