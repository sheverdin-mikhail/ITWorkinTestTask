import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Task } from '@/entities/Task';
import { TaskContextScheme, TaskErrorType } from '../types/task';

interface TaskProviderProps {
    children: ReactNode;
}



const INITIAL_STATE: TaskContextScheme = {
    isError: false,
    isLoading: false,
    isDeleting: false,
    isAdding: false,
    tasks: [],
    formIsEdit: false
};


const TaskContext = createContext<TaskContextScheme>(INITIAL_STATE);

export const useTask = () => useContext(TaskContext);

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [state, setState] = useState<TaskContextScheme>({ ...INITIAL_STATE });
    const [isInit, setIsInit] = useState<boolean>(false); 

    const fetchTasksHandler = useCallback(async () => {
        setState(prevState => ({ ...prevState, isLoading: true, isError: false }));
        try {
            const response = await axios.get<Task[]>(import.meta.env.VITE_API_BASE_URL+'/tasks');
            setState(prev => ({
                ...prev,
                isError: false,
                isLoading: false,
                tasks: response.data,
            }));
        } catch (error: unknown) {
            let errorMessage = 'Failed to fetch tasks';

            if (axios.isAxiosError(error)) {
                // Проверка на AxiosError
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Если это обычный объект ошибки
                errorMessage = error.message;
            }
            setState(prevState => ({ ...prevState, isError: true, isLoading: false, error: {
                error: errorMessage,
                type: TaskErrorType.GET
            }  }));
        }
    }, []);

    const deleteTaskHandler = useCallback(async (deletedTask: Task) => {
        setState(prevState => ({ ...prevState, isDeleting: true }));
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${deletedTask.id}/`);
            if( response.status === 200)
            setState(prev => ({
                ...prev,
                isError: false,
                isDeleting: false,
                tasks: prev.tasks.filter(task => task.id !== deletedTask.id)
            }));
        } catch (error: unknown) {
            let errorMessage = 'Failed to fetch tasks';

            if (axios.isAxiosError(error)) {
                // Проверка на AxiosError
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Если это обычный объект ошибки
                errorMessage = error.message;
            }
            setState(prevState => ({ ...prevState, isError: true, isDeleting: false, error: {
                type: TaskErrorType.DELETE,
                error: errorMessage
            }  }));
        }
    }, [])

    const addTaskHandler = useCallback(async (addedTask: Task) => {
        setState(prevState => ({ ...prevState, isError: false, isAdding: true }));
        try {
            const response = await axios.post<Task>(`${import.meta.env.VITE_API_BASE_URL}/tasks/`, addedTask);
            if( response.status === 201)
            setState(prev => ({
                ...prev,
                isError: false,
                isAdding: false,
                tasks: [...prev.tasks, response.data]
            }));
        } catch (error: unknown) {
            let errorMessage = 'Failed to fetch tasks';
            setState(prev => ({
                ...prev,
                isAdding: false,
            }))
            if (axios.isAxiosError(error)) {
                // Проверка на AxiosError
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Если это обычный объект ошибки
                errorMessage = error.message;
            }
            setState(prevState => ({ ...prevState, isError: true, isAdding: false,  error: { type: TaskErrorType.ADD, error: errorMessage }  }));
        }
    }, [])

    const updateTaskHandler = useCallback(async (updatedTask: Task) => {
        setState(prevState => ({ ...prevState, isAdding: true, formIsEdit: false }));
        try {
            const response = await axios.patch<Task>(`${import.meta.env.VITE_API_BASE_URL}/tasks/${updatedTask.id}/`, updatedTask);
            if( response.status === 200)
            setState(prev => ({
                ...prev,
                isError: false,
                isAdding: false,
                tasks: prev.tasks.map((task) => {
                    if(task.id === updatedTask.id) {
                        return {
                            ...response.data
                        }
                    } 
                    return task
                })
            }));
        } catch (error: unknown) {
            let errorMessage = 'Failed to fetch tasks';

            if (axios.isAxiosError(error)) {
                // Проверка на AxiosError
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Если это обычный объект ошибки
                errorMessage = error.message;
            }
            setState(prevState => ({ ...prevState, isError: true, isAdding: false, error: {error: errorMessage, type: TaskErrorType.UPDATE}  }));
        }
    }, [])

    const setFormDataHandler = useCallback((task: Task) => {
        setState(prev => ({
            ...prev,
            isError: false,
            formIsEdit: true,
            editFormData: task
        }))
    }, [])



    useEffect(() => {
        if(isInit) {
            fetchTasksHandler();
        }
        setIsInit(true)
    }, [fetchTasksHandler, isInit]);

    const value = useMemo(() => ({ 
        ...state,
        deleteTask: deleteTaskHandler,
        addTask: addTaskHandler,
        updateTask: updateTaskHandler,
        setEditFormData: setFormDataHandler,
        fetchTasks: fetchTasksHandler,

    }), [
        state, 
        deleteTaskHandler,
        addTaskHandler,
        updateTaskHandler,
        setFormDataHandler,
        fetchTasksHandler
    ]);

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
