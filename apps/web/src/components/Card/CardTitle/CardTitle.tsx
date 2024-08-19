import { forwardRef } from "react";

import { cn } from "@/utilities/classnames";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      className={cn([
        "text-2xl font-semibold leading-none tracking-tight",
        className,
      ])}
      ref={ref}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

export default CardTitle;
