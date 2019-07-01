import React from 'react'
import { withStyles } from '@material-ui/core'
import HomeStyle from './HomeStyle'

const Display = ({history}) => {

    const createLocalStorage = () => {
        localStorage.setItem('id_token', 'tokentokentoken')
            
        history.push('/dashboard')
    }
    
    return (
        <div style={{backgroundColor: 'grey', width: '100%'}}>
            <p>test</p>
            <button onClick={createLocalStorage}>login</button>

        </div>
    )
}

export default withStyles(HomeStyle)(Display)