import { forwardRef } from "react";

import { cn } from "@/utilities/classnames";

type CardProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn([
        "rounded-xl border bg-card text-card-foreground shadow",
        className,
      ])}
      {...props}
    />
  )
);

Card.displayName = "Card";

export default Card;
