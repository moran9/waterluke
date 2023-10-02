import { Menu, MenuItem, SvgIcon } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import EsLang from '../../../assets/languages/es.svg?react'
import EnLang from '../../../assets/languages/en.svg?react'

type Languages = {
    en: { nativeName: string }
    es: { nativeName: string }
}

const lngs: Languages = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' },
}

export function LaguangeSelector() {
    const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (language: string) => {
        setAnchorEl(null)
        i18n.changeLanguage(language)
    }

    const esLangIcon = <SvgIcon component={EsLang} inheritViewBox></SvgIcon>
    const enLangIcon = <SvgIcon component={EnLang} inheritViewBox></SvgIcon>

    return (
        <>
            <div>
                <IconButton
                    size="small"
                    aria-label="change language"
                    aria-controls="menu-language"
                    aria-haspopup="true"
                    onClick={handleMenu}
                >
                    {i18n.resolvedLanguage === 'es' ? esLangIcon : enLangIcon}
                </IconButton>
                <Menu
                    id="menu-language"
                    anchorEl={anchorEl}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleClose('es')}>{esLangIcon}</MenuItem>
                    <MenuItem onClick={() => handleClose('en')}>{enLangIcon}</MenuItem>
                </Menu>
            </div>
        </>
    )
}
