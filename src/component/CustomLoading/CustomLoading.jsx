import React from 'react'
import { withStyles } from '@material-ui/core'
import CustomLoadingStyle from './CustomLoadingStyle'

const CustomLoading = ({classes}) => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}>
                <div className={classes.inner}></div>
            </div>
        </div>
    )
}

export default withStyles(CustomLoadingStyle)(CustomLoading)