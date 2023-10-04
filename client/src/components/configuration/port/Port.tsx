import { IconButton, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    selectSelectedPort,
    selectAvailablePorts,
    selectPort,
    getPortsAsync,
} from '../../../app/slices/configurationSlice'
import { useEffect } from 'react'

function Port() {
    const port = useAppSelector(selectSelectedPort)
    const availablePorts = useAppSelector(selectAvailablePorts)
    const dispatch = useAppDispatch()

    const handleOnSelectPort = (event: SelectChangeEvent) => {
        dispatch(selectPort(event.target.value))
    }
    const handleOnRefreshPort = () => {
        dispatch(getPortsAsync())
    }

    useEffect(() => {
        dispatch(getPortsAsync())
    }, [dispatch])

    return (
        <>
            <IconButton
                aria-label="refresh-port"
                sx={{ maxHeight: 48, alignSelf: 'center' }}
                color="secondary"
                size="large"
                onClick={handleOnRefreshPort}
            >
                <RefreshIcon />
            </IconButton>
            <FormControl sx={{ flexGrow: 1, maxWidth: 200, marginLeft: 0.5, alignSelf: 'center' }}>
                <InputLabel id="port-select-label">Port</InputLabel>
                <Select
                    labelId="port-select-label"
                    id="port-select"
                    value={port}
                    onChange={handleOnSelectPort}
                    autoWidth
                    label="Port"
                >
                    {availablePorts.map((port) => (
                        <MenuItem value={port} key={port}>
                            {port}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default Port
