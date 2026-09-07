import * as React from 'react';
import { cn } from '@utils/styles';

/** Design-system text link (native `<a>`). Distinct from react-router `Link`. */
function TextLink({ className, ref, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      ref={ref}
      className={cn(
        'text-sm font-medium text-primary underline-offset-4 hover:underline',
        className
      )}
      {...props}
    />
  );
}

export { TextLink };
