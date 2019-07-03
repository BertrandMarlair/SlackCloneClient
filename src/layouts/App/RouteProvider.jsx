import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import dashboard from '../../router/routerPath/dashboard'
import connect from '../../router/routerPath/connect'
import all from '../../router/routerPath/public'
import PrivateRoute from '../../router/routerContainer/PrivateRoute'
import PublicRoute from '../../router/routerContainer/PublicRoute'
import ConnectRoute from '../../router/routerContainer/ConnectRoute'

const RouteProvider = () => {
    return (
        <Router>
            {dashboard.map(({ component, name, path, exact }) => {
                return <PrivateRoute path={path} component={component} key={name} exact={exact} />
            })}
            {connect.map(({ component, name, path, exact }) => {
                return <ConnectRoute path={path} component={component} key={name} exact={exact} />
            })}
            {all.map(({ component, name, path, exact }) => {
                return <PublicRoute path={path} component={component} key={name} exact={exact} />
            })}
        </Router>
    )
}

export default RouteProvider