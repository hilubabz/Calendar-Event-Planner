import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Calendar } from './components/ui/calendar';
import { cn } from './lib/utils';
import CardComponent from './components/CardComponent';
import DialogBox from './components/DialogBox';
import type { TaskType } from './types/TaskType.type';

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [dropdown] =
    useState<React.ComponentProps<typeof Calendar>['captionLayout']>(
      'dropdown'
    );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [task,setTask]=useState<TaskType[]>([])
  const [todaysTask,setTodaysTask]=useState<TaskType[]>([])
  // console.log(date?.toISOString().split('T')[0])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  // console.log(task)
  useEffect(()=>{
    console.log(task)
    setTodaysTask(task.filter(val=>new Date(val.date).toDateString() === date?.toDateString()))
  },[task,date])
  return (
    <div
      className={`px-5 lg:px-10 pt-5 min-h-screen bg-background text-foreground transition-all duration-500 ease-in-out pb-2 max-w-[100vw] flex flex-col gap-4`}
    >
      <div
        className={`flex justify-between p-5 shadow-lg rounded-xl items-center bg-card shrink-0`}
      >
        <div className="flex gap:10 md:gap-30 w-[75%] items-center">
          <div className="font-semibold text-sm md:text-xl">Event Planner</div>
        </div>
        <div className="flex space-x-4">
          <DialogBox date={date ?? new Date()} setTask={setTask} setDate={setDate}/>
          <div className="lg:flex items-center text-3xl gap-2 hidden ">
            {darkMode ? <Moon /> : <Sun />}
            <div
              className={`relative w-14 h-7 ${darkMode ? 'bg-white' : 'bg-gray-400'} rounded-full cursor-pointer transition-all duration-500`}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <div
                className={`absolute top-0.5 ${darkMode ? 'left-[95%] -translate-x-[95%] bg-gray-400' : 'left-0.5 bg-white'} w-6 h-6 rounded-full transition-all duration-500`}
              ></div>
            </div>
          </div>
          <div
            className="lg:hidden h-10 w-10 flex items-center justify-center text-2xl bg-(--bg) text-(--text) shadow-lg rounded-2xl"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <Moon /> : <Sun />}
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-20 px-10">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          captionLayout={dropdown}
          disabled={{ before: new Date() }}
          className={cn(
            'bg-card w-[45%] h-fit shadow-lg rounded-xl duration-500 max-h-full'
          )}
        />
        <div className="flex-1 flex flex-col space-y-5">
          <CardComponent single={true} task={todaysTask}/>
          <CardComponent single={false} task={task}/>
        </div>
      </div>
    </div>
  );
};

export default App;
