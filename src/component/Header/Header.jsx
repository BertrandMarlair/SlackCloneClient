import React from 'react'
import { withStyles } from '@material-ui/core'
import HeaderStyle from './HeaderStyle'
import { useTranslation } from 'react-i18next'
import Button from '../CustomButtons/Button'

const Header = props => {
    const { classes } = props
    const { i18n } = useTranslation()

    const changeLanguage = lng => {
        i18n.changeLanguage(lng)
    }

    return (
        <div className={classes.header}>
            <div className={classes.img}>
                <img src="/images/logo/bfineLogo.jpg" alt="logo bfine" />
            </div>
            <div>
                <Button color="white" onClick={() => changeLanguage('fr')}>fr</Button>
                <Button color="white" onClick={() => changeLanguage('nl')}>nl</Button>
            </div>
        </div>
    )
}

export default withStyles(HeaderStyle)(Header)