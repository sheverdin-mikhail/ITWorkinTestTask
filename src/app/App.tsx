import { TasksList } from '@/features/tasksList'
import './styles/App.scss'
import './styles/index.scss'
import { TaskForm } from '@/features/taskForm'

const App = () => {

  return (
    <div className='wrapper'>
      <div className='grid grid-cols-2 gap-16 smallDevice:grid-cols-1'>
        <div className='col-span-1 flex flex-col gap-[50px] flex-[0_0_50%]'>
          <h2 className='text-5xl font-semibold text-center'>To-Do List</h2>
          <TasksList className='flex flex-col gap-4'/>
        </div>
        <div className='col-span-1 flex flex-col gap-[50px] flex-[0_0_50%]'>
          <h2 className='text-5xl font-semibold text-center'>Add To-Do</h2>
          <TaskForm className=''/>
        </div>
      </div>
    </div>
  )
}

export default App
