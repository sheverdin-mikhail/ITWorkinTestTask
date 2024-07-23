import { useTask } from "@/entities/Task";

interface TaskFormErrorProps {
    className?: string;
}

export const TaskFormError: React.FC<TaskFormErrorProps> = () => {
    const { error } = useTask();

    return (
        <h2 className="text-red-600 font-bold text-xl p-2 bg-blue-200 rounded-xl">
            { error?.error }
        </h2>
    );
}