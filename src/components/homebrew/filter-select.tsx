import * as React from 'react';

/**
 * Homebrew filter control — raw `<select>`.
 * Contrasts with design-system form primitives under `@components/ui`.
 */
export function FilterSelect({
  children,
  ...props
}: React.ComponentProps<'select'>) {
  return <select {...props}>{children}</select>;
}
