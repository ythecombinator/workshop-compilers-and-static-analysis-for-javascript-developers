import * as React from 'react';

/**
 * Homebrew control — raw `<button>`, not from `@components/ui`.
 * Radius Tracker should classify usages as `source: "homebrew"`.
 */
export function LegacyButton({
  children,
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={className ?? 'rounded border px-3 py-1 text-sm'}
      {...props}
    >
      {children}
    </button>
  );
}
