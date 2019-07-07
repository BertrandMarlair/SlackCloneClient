import React from 'react'
import { withStyles } from '@material-ui/core'
import CustomErrorStyle from './CustomErrorStyle'

const CustomError = ({errorMessage, classes}) => {

    if (errorMessage && errorMessage.message){
        return (
            <div className={classes.container}>
                {errorMessage.message}
            </div>
        )
    }else{
        return (
            <div className={classes.container}>
                {errorMessage}
            </div>
        )
    }
}

export default withStyles(CustomErrorStyle)(CustomError)