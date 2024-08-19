import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utilities/classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => (
    <div
      className={cn([
        `flex flex-row items-center h-10 w-full rounded-[5px] border border-input bg-background px-3 py-2 text-sm
     ring-offset-background no-outline focus-visible:outline-none focus-visible:ring-2
     focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
     disabled:opacity-50`,
        className,
      ])}
    >
      <input
        ref={ref}
        className={cn([
          `flex  w-full  bg-background py-2 text-sm
         ring-offset-background no-outline file:border-0 file:bg-transparent file:text-sm file:font-medium
         placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
         disabled:opacity-50`,
          className,
        ])}
        type={type}
        {...props}
      />
      <div className="px-2">{icon}</div>
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
