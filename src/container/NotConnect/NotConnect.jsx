import React from 'react'
import { withStyles } from '@material-ui/core'
import NotConnectStyle from './NotConnectStyle'
import PublicLayout from '../../layouts/Public/Public'

const NotConnect = () => {
    return (
        <PublicLayout>
            NotConnectStyle
        </PublicLayout>
    )
}

export default withStyles(NotConnectStyle)(NotConnect)