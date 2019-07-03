import React from 'react'
import { withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import HomeStyle from './HomeStyle'
import PublicLayout from '../../layouts/Public/Public'

const Display = () => {
    return (
        <PublicLayout>
            Home
            <Link to={'/connect/signin'}>Sign In</Link>
            <Link to={'/connect/login'}>Login</Link>
        </PublicLayout>
    )
}

export default withStyles(HomeStyle)(Display)