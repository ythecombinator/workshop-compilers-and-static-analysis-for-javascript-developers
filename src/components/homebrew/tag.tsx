import * as React from 'react';

/**
 * Homebrew chip — raw `<span>`, not from `@components/ui` Badge.
 * Radius Tracker should classify usages as `source: "homebrew"`.
 */
export function Tag({
  children,
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={
        className ?? 'inline-block rounded bg-gray-200 px-2 py-0.5 text-xs'
      }
      {...props}
    >
      {children}
    </span>
  );
}
