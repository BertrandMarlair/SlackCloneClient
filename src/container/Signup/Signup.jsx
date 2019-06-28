import React from 'react'
import { withStyles } from '@material-ui/core'
import HomeStyle from './HomeStyle'
import { NavLink } from 'react-router-dom'

const Display = () => {
    return (
        <div>
            SignUp
            <NavLink to={'/signin'}>
                <button>
                    signin
                </button>
            </NavLink>
            <NavLink to={'/'}>
                <button>
                    home
                </button>
            </NavLink>
            <NavLink to={'../'}>
                <button>
                    home
                </button>
            </NavLink>
        </div>
    )
}

export default withStyles(HomeStyle)(Display)