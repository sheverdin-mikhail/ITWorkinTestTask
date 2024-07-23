import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import TasksListProvider from './features/tasksList/model/context/taskListContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TasksListProvider>
      <App />
    </TasksListProvider>
  </React.StrictMode>,
)
