import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import Typography from '@components/ui/typography';

//  ---------------------------------------------------------------------------
//  SHARED ANTI-PATTERN — derived state synced in useEffect
//  ---------------------------------------------------------------------------
//
//  Targeted by three tools (same smell, different front-ends):
//
//    yarn demo:ast-grep:npx:derived-state-effect
//    yarn demo:ast-grep:napi:derived-state-effect
//    yarn demo:ast-grep:jssg:derived-state-effect
//
//  Restore from git between runs after a mutating codemod.
//

export function DerivedStateEffectDemo({ title }: { title: string }) {
  const [firstName, setFirstName] = useState('Ada');
  const [lastName, setLastName] = useState('Lovelace');

  // Anti-pattern: recompute during an effect instead of during render
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="derived-first">First name</Label>
              <Input
                id="derived-first"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="derived-last">Last name</Label>
              <Input
                id="derived-last"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <Typography.subtle>
            Derived label: <span className="text-foreground">{fullName}</span>
          </Typography.subtle>
        </div>
      </CardContent>
    </Card>
  );
}
