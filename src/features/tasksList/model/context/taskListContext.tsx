import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { TasksListScheme } from '../types/tasksList';
import { Task } from '@/entities/Task';

interface TasksListProviderProps {
    children: ReactNode;
}

const INITIAL_STATE: TasksListScheme = {
    error: '',
    isError: false,
    isLoading: false,
    isDeleting: false,
    tasks: [],
};


const TasksListContext = createContext<TasksListScheme>(INITIAL_STATE);

export const useTasksList = () => useContext(TasksListContext);

const TasksListProvider: React.FC<TasksListProviderProps> = ({ children }) => {
    const [state, setState] = useState<TasksListScheme>({ ...INITIAL_STATE });
    const [isInit, setIsInit] = useState<boolean>(false); 

    const fetchTasksList = useCallback(async () => {
        setState(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.get(import.meta.env.VITE_API_BASE_URL+'/tasks');
            setState(prev => ({
                ...prev,
                error: '',
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
            setState(prevState => ({ ...prevState, isError: true, error: errorMessage  }));
        }
    }, []);

    const deleteTaskHandler = useCallback(async (deletedTask: Task) => {
        setState(prevState => ({ ...prevState, isDeleting: true }));
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${deletedTask.id}/`);
            if( response.status === 200)
            setState(prev => ({
                ...prev,
                error: '',
                isError: false,
                isLoading: false,
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
            setState(prevState => ({ ...prevState, isError: true, error: errorMessage  }));
        }
    }, [])



    useEffect(() => {
        if(isInit) {
            fetchTasksList();
        }
        setIsInit(true)
    }, [fetchTasksList, isInit]);

    const value = useMemo(() => ({ 
        ...state,
        deleteTask: deleteTaskHandler,

    }), [
        state, 
        deleteTaskHandler
    ]);

    return (
        <TasksListContext.Provider value={value}>
            {children}
        </TasksListContext.Provider>
    );
};

export default TasksListProvider;
