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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { TaskData } from '@/services/Task.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const DialogBox = ({
  date,
  setTask,
  setDate
}: {
  date: Date;
  setTask: Function;
  setDate: Function;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TaskType>({
    mode: 'onChange',
    resolver: zodResolver(TaskData),
    defaultValues: {
      date: date,
    },
  });
  useEffect(() => {
    reset({
      task: watch('task'),
      date: date,
    });
  }, [date]);
  // console.log(date.toISOString().split('T')[0]);
  // console.log(date.toISOString())
  const onSubmit: SubmitHandler<TaskType> = async (data) => {
    // console.log(data);
    setTask((prev:TaskType[]) => {
      const newTasks = [...prev, data];
      newTasks.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return newTasks;
    });
  };

  // console.log(watch());
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Event</Label>
              <Input id="name-1" {...register('task')} />
              {errors.task && (
                <div className="text-red-500">{errors.task.message}</div>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  Date of birth
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                      disabled={{before:new Date()}}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {errors.date && (
                <div className="text-red-500">{errors.date.message}</div>
              )}
            </div>
          </div>
          <DialogFooter className={cn('mt-5')}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
