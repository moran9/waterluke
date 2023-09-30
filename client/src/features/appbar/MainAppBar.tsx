import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import logo from '../../assets/waterluke-logo.png'
import './MainAppBar.css'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Link, matchPath, useLocation } from 'react-router-dom'

export function MainAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt={'watrerluke logo'} className={'logo'} />
                    <Box sx={{ width: '100%' }}>
                        <MyTabs />
                    </Box>
                    {/* TODO Remove this example from MUI */}
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation()

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i]
        const possibleMatch = matchPath(pattern, pathname)
        if (possibleMatch !== null) {
            return possibleMatch
        }
    }

    return null
}

function MyTabs() {
    const routeMatch = useRouteMatch(['/trains', '/configuration'])
    const currentTab = routeMatch?.pattern?.path

    return (
        <Tabs value={currentTab} sx={{ marginLeft: '100px' }} textColor="secondary" indicatorColor="secondary">
            <Tab label="Trenes" value="/trains" to="/trains" component={Link} />
            <Tab label="Configuración" value="/configuration" to="/configuration" component={Link} />
        </Tabs>
    )
}
