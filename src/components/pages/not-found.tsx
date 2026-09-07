import { Link, useRouteError } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';
import { LegacyButton } from '@components/homebrew/legacy-button';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Typography from '@components/ui/typography';

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-warning-500" />
            <CardTitle>Page Not Found</CardTitle>
            <Badge variant="outline">404</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Typography.subtle>
            The page you're looking for doesn't exist or has been moved.
          </Typography.subtle>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <LegacyButton onClick={() => window.history.back()}>
              Go back
            </LegacyButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
