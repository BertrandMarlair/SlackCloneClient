import React from 'react'
import { Route } from 'react-router-dom'
import isAuthenticated from '../../utils/auth/isAuthenticated'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, history, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                (isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                ))
            }
        />
    )
}

export default PrivateRoute