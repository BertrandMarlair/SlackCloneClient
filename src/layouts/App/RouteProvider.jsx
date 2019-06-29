import React from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import MainLayout from '../Dashboard/Dashboard'
import Login from '../Connect/Connect'

const RouteProvider = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
            <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
            <PrivateRoute path="/app" component={MainLayout} />
            <PublicRoute path="/login" component={Login} />
            <Redirect to="/" />
        </Switch>
    </Router>
)

export default RouteProvider