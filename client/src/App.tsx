import { MainAppBar as AppBar } from './components/appbar/MainAppBar'
import { Outlet } from 'react-router-dom'
import { CustomSnackbar } from './components/common/snackbar'

function App() {
    return (
        <>
            <AppBar />
            <Outlet />
            <CustomSnackbar />
        </>
    )
}

export default App
