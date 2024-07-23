export interface Task {
    id?: number
    title: string
    description: string
    createdAt: string
}

export enum TaskErrorType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update',
    GET = 'get'
}

export interface TaskErrorProps {
    error: string
    type: TaskErrorType
}

export interface TaskContextScheme {
    tasks: Task[]
    isLoading?: boolean
    isError?: boolean
    isDeleting?: boolean
    isAdding?: boolean
    error?: TaskErrorProps
    editFormData?: Task
    formIsEdit?: boolean

    setEditFormData?: (task: Task) => void
    deleteTask?: (task: Task) => void
    updateTask?: (task: Task) => void
    addTask?: (task: Task) => void
    fetchTasks?: () => void
}

