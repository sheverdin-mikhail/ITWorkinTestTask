import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    size?: ButtonSize;
}

export enum ButtonTheme {
    EDIT = 'edit',
    DELETE = 'delete',
    PRIMARY = 'primary',
}

export enum ButtonSize {
    SMALL = 's',
    LARGE = 'l'
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { className, disabled, children, theme = ButtonTheme.PRIMARY, size = ButtonSize.SMALL, ...otherProps } = props;

    return (
        <button 
            className={clsx(
                'p-2 uppercase font-bold rounded-xl text-white disabled:opacity-50', 
                {
                    'bg-red-400': theme === ButtonTheme.DELETE,
                    'bg-orange-400': theme === ButtonTheme.EDIT,
                    'bg-green-400': theme === ButtonTheme.PRIMARY,
                    'text-sm': size === ButtonSize.SMALL,
                    'text-lg': size === ButtonSize.LARGE
                },
            )} 
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
}