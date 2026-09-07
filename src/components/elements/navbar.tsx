import { WandSparklesIcon } from 'lucide-react';
import Typography from '@components/ui/typography';

export default function NavigationBar() {
  return (
    <nav className="fixed w-full z-30 border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-2 text-primary min-w-0">
            <WandSparklesIcon className="h-6 w-6 shrink-0" />
            <Typography.h1 className="text-lg font-semibold tracking-tight truncate">
              Compilers & Static Analysis for JavaScript Developers
            </Typography.h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
