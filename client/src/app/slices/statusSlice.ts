import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AlertColor } from '@mui/material'

type InitialConfigurationState = {
    snackbar: {
        open: boolean
        severity: AlertColor
        text: string
    }
}
const initialState: InitialConfigurationState = {
    snackbar: {
        open: false,
        severity: 'error',
        text: '',
    },
}

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        openSnackbar: (state, action: PayloadAction<{ severity: AlertColor; text: string }>) => {
            state.snackbar.open = true
            state.snackbar.severity = action.payload.severity
            state.snackbar.text = action.payload.text
        },
        closeSnackbar: (state) => {
            state.snackbar.open = false
        },
    },
})

export const { openSnackbar, closeSnackbar } = statusSlice.actions
export const selectSnackbarOpen = (state: RootState) => state.status.snackbar.open
export const selectSnackbarSeverity = (state: RootState) => state.status.snackbar.severity
export const selectSnackbarText = (state: RootState) => state.status.snackbar.text
export default statusSlice.reducer
