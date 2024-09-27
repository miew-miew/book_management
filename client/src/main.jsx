import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import React from 'react'
import "./App.css"

createRoot(document.getElementById('root')).render(
        <React.StrictMode>
                <RouterProvider router={router} />
        </React.StrictMode>
)
