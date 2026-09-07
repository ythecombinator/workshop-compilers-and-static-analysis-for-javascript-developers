import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Typography from '@components/ui/typography';

//  ---------------------------------------------------------------------------
//  ANTI-PATTERN TO BE FIXED VIA ast-grep
//  ---------------------------------------------------------------------------
//
//  This file uses eager useState initializers that should be lazy.
//  The constructor argument runs on EVERY render, even though React
//  only uses the result on the initial mount.
//
//  Run the NPM script to apply the ast-grep rule:
//    yarn codemod:ast-grep
//

//  ---------------------------------------------------------------------------
//  DATA
//  ---------------------------------------------------------------------------

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

//  ---------------------------------------------------------------------------
//  UI: CORE
//  ---------------------------------------------------------------------------

export default function Demo() {
  const [renderCount, setRenderCount] = useState(0);

  // Anti-pattern: eager initializers (ast-grep target)
  // new Set() / new Map() run on EVERY render, not just mount
  const [completedIds, setCompletedIds] = useState(
    new Set<string>(
      INITIAL_TASKS.filter((task) => task.completed).map((task) => task.id)
    )
  );
  const [notes] = useState(new Map<string, string>());

  const toggleTask = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ast-grep</CardTitle>
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
