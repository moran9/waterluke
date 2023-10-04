import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type InitialConfigurationState = {
    selectedPort: string
    availablePorts: string[]
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

export const getPortsAsync = createAsyncThunk('configuration/getPorts', async () => {
    const response = await new Promise((resolve) => setTimeout(() => resolve(['COM1S', 'COM2S', 'COM3S']), 200)) //getPorts();
    // transform data from API to mach the store
    return response as InitialConfigurationState['availablePorts']
})

export const { selectPort } = configurationSlice.actions
export const selectSelectedPort = (state: RootState) => state.configuration.selectedPort
export const selectAvailablePorts = (state: RootState) => state.configuration.availablePorts
export default configurationSlice.reducer
