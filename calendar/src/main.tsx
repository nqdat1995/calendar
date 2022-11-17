import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import Calendar from './components/Calendar'
import JobTable from './components/JobTable'
import { store } from './context/store'
import TodoProvider from './context/TodoContext'
//import './index.css'
import './style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store
  }>
    <Calendar />
    <JobTable />
  </Provider>
  // </React.StrictMode>
)
