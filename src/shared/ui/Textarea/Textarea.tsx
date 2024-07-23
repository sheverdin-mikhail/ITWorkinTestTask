import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';

type HTMLTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

interface TextareaProps extends HTMLTextareaProps {
    className?: string;
    value: string;
    onChange?: (value: string) => void;
    label?: string;
    id?: string;
}

export const Textarea: React.FC<TextareaProps> = (props) => {
    const { className, onChange, label, id, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
      };

    return (
        <div>
            {
                label && <label htmlFor={id} >{label}</label>
            }
            <textarea 
                className={clsx(['py-3 px-4 text-lg bg-blue-100 rounded-2xl w-full resize-none', className])}
                rows={10}
                onChange={onChangeHandler} 
                {...otherProps} 
            />   
        </div>         
    );
}