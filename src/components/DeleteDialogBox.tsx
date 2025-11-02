import type { TaskType } from '@/types/TaskType.type';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const DeleteDialogBox = ({
  date,
  setTask,
}: {
  date: Date | undefined;
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) => {
  const deleteTask = () => {
    setTask((prev: TaskType[]) =>
      prev.filter(
        (val) =>
          new Date(val.date)?.toLocaleDateString() !==
          date?.toLocaleDateString()
      )
    );
    toast.success('Task deleted successfully');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the task of{' '}
            {date?.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={cn('mt-5')}>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={'destructive'} onClick={deleteTask}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogBox;
