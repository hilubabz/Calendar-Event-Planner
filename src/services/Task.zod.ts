import {z} from 'zod';

export const TaskData=z.object({
  task:z.string().min(1,'Please enter a task'),
  date:z.date()
})