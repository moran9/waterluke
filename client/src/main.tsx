import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './app/store.ts'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './ErrorPage'
import Trains from './components/trains/Trains.tsx'
import Configuration from './components/configuration/Configuration.tsx'
import Theme from './theme.ts'
import { ThemeProvider } from '@mui/material/styles'

import './i18n'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'trains',
                element: <Trains />,
            },
            {
                path: 'configuration',
                element: <Configuration />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={Theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </React.StrictMode>
    </Provider>,
)
