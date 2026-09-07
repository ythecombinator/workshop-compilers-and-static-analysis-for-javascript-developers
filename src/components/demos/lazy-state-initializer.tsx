import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Typography from '@components/ui/typography';

//  ---------------------------------------------------------------------------
//  SHARED ANTI-PATTERN — eager useState(new …)
//  ---------------------------------------------------------------------------
//
//  Targeted by three tools (same smell, different front-ends):
//
//    yarn demo:ast-grep:npx:lazy-state-initializer
//    yarn demo:ast-grep:napi:lazy-state-initializer
//    yarn demo:ast-grep:jssg:lazy-state-initializer
//
//  Restore from git between runs after a mutating codemod.
//

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 'a', title: 'Profile with React DevTools', completed: true },
  { id: 'b', title: 'Fix unnecessary re-renders', completed: false },
  { id: 'c', title: 'Add Suspense boundaries', completed: false },
  { id: 'd', title: 'Split heavy bundles', completed: true },
  { id: 'e', title: 'Measure Core Web Vitals', completed: false },
];

export function LazyStateInitializerDemo({ title }: { title: string }) {
  const [renderCount, setRenderCount] = useState(0);

  // Anti-pattern: constructors run on every render, not just mount
  const [completedIds, setCompletedIds] = useState(
    new Set<string>(
      INITIAL_TASKS.filter((task) => task.completed).map((task) => task.id)
    )
  );
  const [notes] = useState(new Map<string, string>());

  const toggleTask = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setRenderCount((prev) => prev + 1)}
            >
              Force re-render ({renderCount})
            </Button>
            <Typography.subtle>
              Completed: {completedIds.size}/{INITIAL_TASKS.length} / Notes:{' '}
              {notes.size}
            </Typography.subtle>
          </div>

          <div className="space-y-2">
            {INITIAL_TASKS.map((task) => {
              const isCompleted = completedIds.has(task.id);
              return (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                    isCompleted
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <span
                    className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {task.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
