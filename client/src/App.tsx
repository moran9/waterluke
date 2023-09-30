import { MainAppBar as AppBar } from './features/appbar/MainAppBar'
import { Outlet } from 'react-router-dom'

function App() {
    return (
        <>
            <AppBar />
            <Outlet />
        </>
    )
}

export default App
