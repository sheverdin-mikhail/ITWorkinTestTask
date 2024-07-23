import { useTask } from "@/entities/Task";
import { Board } from "@/shared/ui/Board/Board";
import { Button, ButtonSize } from "@/shared/ui/Button/Button";
import clsx from "clsx";

interface TasksListErrorProps {
    className?: string;
}

export const TasksListError: React.FC<TasksListErrorProps> = (props) => {
    const { className } = props;
    const { error, fetchTasks } = useTask();

    const buttonClickHandler = () => () => {
        fetchTasks?.()
    }

    return (
        <Board className={clsx(className, 'flex flex-col items-center gap-3')}>
            <h2 className="text-red-600 font-bold text-xl p-2 bg-blue-200 rounded-xl">
                { error?.error }
            </h2>
            <Button onClick={buttonClickHandler()} size={ButtonSize.LARGE}>Обновить список задач</Button>
        </Board>
    );
}