import { useEffect, useState } from 'react';

export function DerivedLabel(props: { firstName: string; lastName: string }) {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Intentional smell for yarn demo:react-doctor (derived state via effect).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- workshop anti-pattern
    setFullName(`${props.firstName} ${props.lastName}`);
  }, [props.firstName, props.lastName]);

  return <span className="text-sm text-muted-foreground">{fullName}</span>;
}
