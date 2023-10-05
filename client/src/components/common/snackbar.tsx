//import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectSnackbarOpen, selectSnackbarSeverity, selectSnackbarText } from '../../app/slices/statusSlice'
import { closeSnackbar } from '../../app/slices/statusSlice'
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Slide, { SlideProps } from '@mui/material/Slide'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
type TransitionProps = Omit<SlideProps, 'direction'>
function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
}
export function CustomSnackbar() {
    const open = useAppSelector(selectSnackbarOpen)
    const severity = useAppSelector(selectSnackbarSeverity)
    const text = useAppSelector(selectSnackbarText)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(closeSnackbar())
    }

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={TransitionUp}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </>
    )
}
