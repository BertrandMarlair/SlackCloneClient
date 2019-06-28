import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component, ...rest }) => {
    return (
        <Route
            {...rest} render={props => (
                localStorage.getItem('id_token') ? (
                    <Redirect
                        to={{
                            pathname: '/',
                        }}
                    />
                ) : (
                        React.createElement(component, props)
                    )
            )}
        />
    )
}

export default PublicRoute