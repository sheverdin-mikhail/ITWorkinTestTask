import clsx from 'clsx';
import { ReactNode } from 'react';

interface BoardProps {
    className?: string;
    children: ReactNode;
}

export const Board: React.FC<BoardProps> = (props) => {
    const { children, className, ...otherProps } = props;

    return (
        <div className={clsx('p-3 bg-blue-400 rounded-xl', className)} {...otherProps}>
            {children}
        </div>
    );
}