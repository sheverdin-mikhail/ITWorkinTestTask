import clsx from 'clsx';
import cls from './TasksList.module.scss';
import { TasksListEmpty } from '../TasksListEmpty/TasksListEmpty';
import { TasksListItem } from '../TasksListItem/TasksListItem';
import { Board } from '@/shared/ui/Board/Board';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Task, useTask } from '@/entities/Task';
import { TaskErrorType } from '@/entities/Task/model/types/task';
import { TasksListError } from '../TasksListError/TasksListError';

interface TasksListProps {
    className?: string;
}

export const TasksList: React.FC<TasksListProps> = (props) => {
    const { className } = props;
    const { tasks, isLoading, isDeleting, deleteTask, setEditFormData, isError, error } = useTask();

    const onTaskDeleteHandler = (task: Task) => {
        deleteTask?.(task)
    }

    const onTaskEditHandler = (task: Task) => {
        setEditFormData?.(task)
    } 

    if(error?.type === TaskErrorType.GET && isError) {
        return <TasksListError />
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
                                <TasksListItem disabled={isDeleting ?? false} task={task} key={task.id} onDelete={onTaskDeleteHandler} onEdit={onTaskEditHandler}/>
                            ))
                }
            </ul>
        }
        </Board>
        
    );
}