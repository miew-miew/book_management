import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import React from 'react'
import "./App.css"
import ContextProvider from './Contexts/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
        <React.StrictMode>
                <ContextProvider>
                        <RouterProvider router={router} />
                </ContextProvider>
        </React.StrictMode>
)
