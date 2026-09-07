import * as React from 'react';

/**
 * Homebrew field — raw `<input>`, not from `@components/ui`.
 * Radius Tracker should classify usages as `source: "homebrew"`.
 */
export function PlainInput(props: React.ComponentProps<'input'>) {
  return <input type="text" {...props} />;
}
