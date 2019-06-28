import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Headers from '../component/Header/Header'
import routes from '../router/connect'

const Main = () =>(
    <Fragment>
        <Headers />
        <Router basename={'/login'}>
            <Switch>
                {routes.map(({ component, name, path, exact }) => {
                    return <Route path={path} component={component} key={name} exact={exact} />
                })}
                <Redirect to={'/'} />
            </Switch>
        </Router>
    </Fragment>
) 

export default Main