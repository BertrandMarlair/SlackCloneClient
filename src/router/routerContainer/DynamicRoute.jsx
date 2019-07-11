import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import isAuthenticated from '../../utils/auth/isAuthenticated'
import { Redirect } from 'react-router-dom'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'

const DynamicRoute = ({ component, path, ...rest }) => {

    const Page = lazy(() => import(`../../container/${component}`))

    return (
        <Route
            path={path}
            render={props =>
                (isAuthenticated() ? (
                    <DashboardLayout>
                        <Page {...rest} />
                    </DashboardLayout>
                ) : (
                    <Redirect to="/" />
                ))
            }
        />
    )
}

export default DynamicRoute