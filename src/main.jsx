import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserContextProvider from './components/context/UserContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <App/>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
