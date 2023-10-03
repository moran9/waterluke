import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import React from 'react'
import { FormGroup, IconButton, MenuItem, Paper } from '@mui/material'
import Stack from '@mui/system/Stack'
import Box from '@mui/system/Box'
import RefreshIcon from '@mui/icons-material/Refresh'
import Grid from '@mui/material/Unstable_Grid2'
import styled from '@mui/system/styled'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    color: theme.palette.text.secondary,
}))

function Configuration() {
    const [port, setPort] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setPort(event.target.value)
        console.log(event.target.value)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                height: '100vh',
                marginTop: 1.5,
                minWidth: 300,
                p: 2,
                borderRadius: 0.5,
                boxShadow: 2,
            }}
        >
            <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch">
                <Grid xs={2} sm={4} md={4} key={0}>
                    <Item>
                        <IconButton
                            aria-label="refresh-port"
                            sx={{ maxHeight: 48, alignSelf: 'center' }}
                            color="secondary"
                            size="large"
                        >
                            <RefreshIcon />
                        </IconButton>
                        <FormControl sx={{ flexGrow: 1, maxWidth: 200, marginLeft: 0.5, alignSelf: 'center' }}>
                            <InputLabel id="port-select-label">Port</InputLabel>
                            <Select
                                labelId="port-select-label"
                                id="port-select"
                                value={port}
                                onChange={handleChange}
                                autoWidth
                                label="Port"
                            >
                                <MenuItem value={'COM1'}>COM1</MenuItem>
                                <MenuItem value={'COM2'}>COM2</MenuItem>
                                <MenuItem value={'COM3'}>COM3</MenuItem>
                                <MenuItem value={'COM4'}>COM4</MenuItem>
                            </Select>
                        </FormControl>
                    </Item>
                </Grid>
                <Grid xs={2} sm={4} md={4} key={1}>
                    <Item>Item 2</Item>
                </Grid>
                <Grid xs={2} sm={4} md={4} key={2}>
                    <Item>Item 3</Item>
                </Grid>
                <Grid xs={2} sm={4} md={4} key={3}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={2} sm={4} md={4} key={4}>
                    <Item>Item 5</Item>
                </Grid>
                <Grid xs={2} sm={4} md={4} key={5}>
                    <Item>Item 6</Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Configuration
