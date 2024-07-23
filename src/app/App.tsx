import { TasksList } from '@/features/tasksList'
import './styles/App.scss'
import './styles/index.scss'
import { CreateTaskForm } from '@/features/createTask'

const App = () => {

  return (
    <div className='wrapper'>
      <div className='app'>
        <div className='flex flex-col gap-[50px] flex-[0_1_50%]'>
          <h2 className='text-5xl font-semibold text-center'>To-Do List</h2>
          <TasksList className='flex flex-col gap-4'/>
        </div>
        <div className='flex flex-col gap-[50px] flex-[0_1_50%]'>
          <h2 className='text-5xl font-semibold text-center'>Add To-Do</h2>
          <CreateTaskForm className=''/>
        </div>
      </div>
    </div>
  )
}

export default App
