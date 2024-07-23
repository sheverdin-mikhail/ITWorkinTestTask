import clsx from 'clsx';
import cls from './Loader.module.scss';

interface LoaderProps {
    className?: string;
    size: LoaderSize;
}

export enum LoaderSize {
    M = "m",
    S = "s",
    L = 'l',
}

export const Loader: React.FC<LoaderProps> = (props) => {
    const { className, size = LoaderSize.M } = props;

    return (
        <div className={clsx(
            cls.loader,
            'bg-blue-100',
            {
                'w-12': size === LoaderSize.M,
                'w-20': size === LoaderSize.L,
                'w-8': size === LoaderSize.S,
            },
            [className]
        )}></div>
    );
}