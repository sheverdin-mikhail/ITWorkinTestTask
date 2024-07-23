import clsx from 'clsx';
import { Task } from '@/entities/Task';
import { getStringFromDate } from '@/shared/ui/lib/getStringFromDate';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

interface TasksListItemProps {
    className?: string
    task: Task
    onDelete: (task: Task) => void
    onEdit: (task: Task) => void
    disabled: boolean
}

export const TasksListItem: React.FC<TasksListItemProps> = (props) => {
    const { 
        className,
        task,
        onDelete,
        onEdit,
        disabled
    } = props;

    const onDeleteHandler = (task: Task) => () => {
        onDelete(task);
    };

    const onEditHandler = (task: Task) => () => {
        onEdit(task);
    };


    return (
        <li className={clsx([className, 'text-lg flex gap-4 justify-between px-4 py-2 bg-blue-100 rounded-xl smallDevice:flex-col'])}>
            <div>
                <h3 className='text-xl smallDevice:text-base'>{task.title}</h3>
                <div className='flex flex-col gap-4'>
                    <p className='text-base flex-grow smallDevice:text-sm'>{task.description}</p>
                    <p className='text-base'>{getStringFromDate(task.createdAt)}</p>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-2'>
                <Button disabled={disabled} theme={ButtonTheme.DELETE} onClick={onDeleteHandler(task)}>Удалить</Button>
                <Button disabled={disabled} theme={ButtonTheme.EDIT} onClick={onEditHandler(task)}>Редактировать</Button>
            </div>
        </li>
    );
}