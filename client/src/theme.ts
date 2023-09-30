import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    type Theme = {
        status: {
            danger: string
        }
    }
    // allow configuration using `createTheme`
    type ThemeOptions = {
        status?: {
            danger?: string
        }
    }
}

export default createTheme({
    palette: {
        primary: {
            main: '#9cb8d3',
        },
        secondary: {
            main: '#262ea3',
        },
    },
})
