import React from 'react'
import { withStyles } from '@material-ui/core'
import HomeStyle from './HomeStyle'

const Display = () => {

    return (
        <div>
            <p>Home</p>
        </div>
    )
}

export default withStyles(HomeStyle)(Display)