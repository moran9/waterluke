import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { api } from '../api'

import { openSnackbar } from '../../app/slices/statusSlice'

type InitialConfigurationState = {
    selectedPort: string
    availablePorts: string[] | undefined
    status: 'idle' | 'loading' | 'failed'
}

const initialState: InitialConfigurationState = {
    selectedPort: '',
    availablePorts: [],
    status: 'idle',
}

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        selectPort: (state, action: PayloadAction<string>) => {
            state.selectedPort = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPortsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPortsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.availablePorts = action.payload
            })
            .addCase(getPortsAsync.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const getPortsAsync = createAsyncThunk('configuration/getPorts', async (_, { dispatch }) => {
    // TODO remove hardcode base url
    const url = 'http://127.0.0.1:8080/api/serial-port/available-ports'

    try {
        return await api<string[] | string>(url)
    } catch (e: unknown) {
        dispatch(openSnackbar({ severity: 'error', text: (e as Error).message }))
    }
})

export const { selectPort } = configurationSlice.actions
export const selectSelectedPort = (state: RootState) => state.configuration.selectedPort
export const selectAvailablePorts = (state: RootState) => state.configuration.availablePorts
export default configurationSlice.reducer
