import { Link, useLocation } from 'react-router-dom';
import { Tag } from '@components/homebrew/tag';
import { Badge } from '@components/ui/badge';
import { Separator } from '@components/ui/separator';
import Typography from '@components/ui/typography';
import { demos } from '../../demos';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 border-r border-border bg-muted/30 h-full overflow-y-auto hidden md:block">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between px-3 gap-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Demos
          </div>
          <Badge variant="outline">{demos.length}</Badge>
        </div>
        <nav className="space-y-0.5">
          {demos.map((demo) => {
            const isActive = location.pathname === demo.path;

            return (
              <Link
                key={demo.id}
                to={demo.path}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {demo.title}
              </Link>
            );
          })}
        </nav>
        <Separator />
        <div className="px-3 space-y-2">
          <Typography.subtle>
            Sidebar mixes kit badges with homebrew tags for Radius Tracker.
          </Typography.subtle>
          <div className="flex flex-wrap gap-1">
            <Tag>legacy nav chip</Tag>
            <Tag>untracked</Tag>
          </div>
        </div>
      </div>
    </aside>
  );
}
