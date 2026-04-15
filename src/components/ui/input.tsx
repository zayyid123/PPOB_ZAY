import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-muted transition-colors cursor-pointer',
              error && 'text-destructive/80',
            )}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex w-full rounded-md border h-11 pr-10 focus-visible:ring-secondary/80 transition-all border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive/80',
            icon && 'pl-9',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
