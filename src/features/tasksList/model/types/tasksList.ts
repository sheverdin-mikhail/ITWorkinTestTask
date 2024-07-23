import { Task } from "@/entities/Task";

export interface TasksListScheme {
    tasks: Task[]
    isLoading: boolean
    isError: boolean
    isDeleting: boolean
    error: string

    deleteTask?: (task: Task) => void
    updateTask?: (task: Task) => void
}