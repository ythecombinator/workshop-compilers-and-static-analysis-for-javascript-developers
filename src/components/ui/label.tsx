import * as React from 'react';
import { cn } from '@utils/styles';

function Label({ className, ref, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}

export { Label };
