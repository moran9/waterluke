import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import logo from '../../assets/waterluke-logo.png'
import './MainAppBar.css'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { LaguangeSelector } from './languageSelector/LanguageSelector'
import { useTranslation } from 'react-i18next'

export function MainAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt={'watrerluke logo'} className={'logo'} />
                    <Box sx={{ width: '100%' }}>
                        <MyTabs />
                    </Box>
                    <LaguangeSelector />
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
    const { t } = useTranslation()
    const routeMatch = useRouteMatch(['/trains', '/configuration'])
    const currentTab = routeMatch?.pattern?.path

    return (
        <Tabs value={currentTab} sx={{ marginLeft: '100px' }} textColor="secondary" indicatorColor="secondary">
            <Tab label={t('appbar.trainsTab')} value="/trains" to="/trains" component={Link} />
            <Tab label={t('appbar.configTab')} value="/configuration" to="/configuration" component={Link} />
        </Tabs>
    )
}
