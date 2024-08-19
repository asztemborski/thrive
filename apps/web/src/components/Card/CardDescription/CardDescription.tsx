import { forwardRef } from "react";

import { cn } from "@/utilities/classnames";

type CardDescriptionProps = React.HTMLAttributes<HTMLHeadingElement>;

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <h3 className={cn(["text-sm", className])} ref={ref} {...props} />
  )
);

CardDescription.displayName = "CardDescription";

export default CardDescription;
