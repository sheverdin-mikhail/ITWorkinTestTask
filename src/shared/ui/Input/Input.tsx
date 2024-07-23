import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value: string;
    onChange?: (value: string) => void;
    label?: string;
    id?: string;
}

export const Input: React.FC<InputProps> = (props) => {
    const { className, onChange, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      };

    return (
        <input 
            className={clsx(['py-3 px-4 text-lg bg-blue-100 rounded-2xl', className])}
            onChange={onChangeHandler} 
            {...otherProps} 
        />            
    );
}