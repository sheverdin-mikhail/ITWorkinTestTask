import clsx from 'clsx';
import cls from './TasksList.module.scss';
import { TasksListEmpty } from '../TasksListEmpty/TasksListEmpty';
import { TasksListItem } from '../TasksListItem/TasksListItem';
import { Board } from '@/shared/ui/Board/Board';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { useTasksList } from '../../model/context/taskListContext';
import { Task } from '@/entities/Task';

interface TasksListProps {
    className?: string;
}

export const TasksList: React.FC<TasksListProps> = (props) => {
    const { className } = props;
    const { tasks, isLoading, isDeleting, deleteTask } = useTasksList();

    const onTaskDelete = (task: Task) => {
        deleteTask?.(task)
    }

    return (
        <Board className={className}>
        {
            isLoading 
            ? <div className='w-full flex items-center justify-center' ><Loader size={LoaderSize.M}/></div>
            : <ul className={clsx(cls.tasksList, 'flex flex-col gap-2')}>
                {
                    !tasks?.length 
                        ? <TasksListEmpty/> 
                        : tasks.map((task) => 
                            (
                                <TasksListItem disabled={isDeleting} task={task} key={task.id} onDelete={onTaskDelete}/>
                            ))
                }
            </ul>
        }
        </Board>
        
    );
}