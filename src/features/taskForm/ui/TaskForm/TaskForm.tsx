import { useTask } from '@/entities/Task';
import { TaskErrorType } from '@/entities/Task/model/types/task';
import { Board } from '@/shared/ui/Board/Board';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import clsx from 'clsx';
import { FormEventHandler, useEffect, useState } from 'react';
import { TaskFormError } from '../TaskFormError/TaskFormError';

interface TaskFormProps {
    className?: string;
}

export const TaskForm: React.FC<TaskFormProps> = (props) => {
    const { className } = props;

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { addTask, isAdding, formIsEdit, editFormData, updateTask, isError, error } = useTask()

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if(!formIsEdit) {
            addTask?.({
                title,
                description,
                createdAt: new Date().toString(),
            })
        } else {
            updateTask?.({
                ...editFormData,
                title: title,
                description: description,
                createdAt: new Date().toString(),
            })
        }
        setTitle('')
        setDescription('')
    }

    useEffect(() => {
        if (formIsEdit) {
            setTitle(editFormData?.title || '')
            setDescription(editFormData?.description || '')
        }
    }, [formIsEdit, editFormData])

    return (
        <Board className={clsx(className, 'flex flex-col gap-5')}>
            <h3 className='text-3xl font-bold uppercase text-white text-center w-full text-ellipsis whitespace-nowrap overflow-hidden'>
                {formIsEdit ? `Редактирование задачи '${editFormData?.title}'` : 'Добавление задачи'}
            </h3>
            <form className={clsx(['flex flex-col gap-2'])} onSubmit={onSubmitHandler}>
                <Input value={title} onChange={setTitle} placeholder='Заголовок' />
                <Textarea value={description} onChange={setDescription} placeholder='Описание' />
                <Button type='submit' size={ButtonSize.LARGE} className='py-4 text-3xl' disabled={isAdding}>
                    Сохранить
                </Button>
            </form>
            {
                (isError && (error?.type === TaskErrorType.ADD || error?.type === TaskErrorType.UPDATE)) && (
                    <TaskFormError /> 
                )
            }
        </Board>
    );
}