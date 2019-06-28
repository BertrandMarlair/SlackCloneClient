import React from 'react'
import { withStyles } from '@material-ui/core'
import HeaderStyle from './HeaderStyle'
import { useTranslation } from 'react-i18next'
import Button from '../CustomButtons/Button'

const Header = props => {
    const { classes } = props
    const { t, i18n } = useTranslation()

    const changeLanguage = lng => {
        i18n.changeLanguage(lng)
    }

    return (
        <div>
            <span className={classes.header}>{t('header.title')}</span>
            <div>
                <Button color="dark" onClick={() => changeLanguage('fr')}>fr</Button>
                <Button color="dark" onClick={() => changeLanguage('nl')}>nl</Button>
            </div>
        </div>
    )
}

export default withStyles(HeaderStyle)(Header)