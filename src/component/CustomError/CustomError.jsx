import React from 'react'
import { withStyles } from '@material-ui/core'
import CustomErrorStyle from './CustomErrorStyle'

const CustomError = ({errorMessage, classes}) => {
    return (
        <div className={classes.container}>
            {errorMessage}
        </div>
    )
}

export default withStyles(CustomErrorStyle)(CustomError)