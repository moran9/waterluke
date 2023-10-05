import { Paper } from '@mui/material'
import Box from '@mui/system/Box'
import Grid from '@mui/material/Unstable_Grid2'
import styled from '@mui/system/styled'
import Port from './port/Port'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    color: theme.palette.text.secondary,
}))

function Configuration() {
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
                        <Port />
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
