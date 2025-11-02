import type { TaskType } from '@/types/TaskType.type';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

const CardComponent = ({
  single,
  task,
}: {
  single: boolean;
  task: TaskType[];
}) => {
  return (
    <Card className="w-full max-w-md duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {single ? "Today's" : 'Upcoming'} Events
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {single ? '1 event today' : `${task.length} upcoming events`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className={cn('w-full rounded-md', single ? '' : 'h-50')}>
          <div className="space-y-4 pr-4">
            {task.length === 0 ? (
              <p className="text-center text-muted-foreground">No events</p>
            ) : (
              task.map((val) => (
                <div
                  key={val.task + val.date}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{val.task}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(val.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
