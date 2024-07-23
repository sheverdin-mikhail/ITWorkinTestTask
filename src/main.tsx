import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App.tsx'
import { TaskProvider } from '@/entities/Task'
import { Web3Provider } from '@/entities/Web3'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
      <TaskProvider >
        <App />
      </TaskProvider>
    </Web3Provider>
  </React.StrictMode>,
)
