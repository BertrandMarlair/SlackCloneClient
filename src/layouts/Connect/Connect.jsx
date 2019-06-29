import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Headers from '../../component/Header/Header'
import routes from '../../router/connect'

const Main = () =>(
    <Fragment>
        <Headers />
        <BrowserRouter>
            <Switch>
                {routes.map(({ component, name, path, exact }) => {
                    return <Route path={path} component={component} key={name} exact={exact} />
                })}
                <Redirect to={'/login/signin'} />
            </Switch>
        </BrowserRouter>
    </Fragment>
) 

export default Main