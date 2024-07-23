import clsx from "clsx";

interface TasksListEmptyProps {
    className?: string;
}

export const TasksListEmpty: React.FC<TasksListEmptyProps> = (props) => {
    const { className } = props;

    return (
        <li className={clsx([className])}>
            Список задач пуст
        </li>
    );
}