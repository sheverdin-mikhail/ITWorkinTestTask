import { Board } from '@/shared/ui/Board/Board';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import clsx from 'clsx';
import { FormEventHandler, useState } from 'react';

interface CreateTaskFormProps {
    className?: string;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = (props) => {
    const { className } = props;

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log(title)
        console.log(description)
    }

    return (
        <Board className={className}>
            <form className={clsx(['flex flex-col gap-2'])} onSubmit={onSubmitHandler}>
                <Input value={title} onChange={setTitle} placeholder='Заголовок' />
                <Textarea value={description} onChange={setDescription} placeholder='Описание' />
                <Button type='submit' size={ButtonSize.LARGE} className='py-4 text-3xl' >
                    Сохранить
                </Button>
            </form>
        </Board>
    );
}