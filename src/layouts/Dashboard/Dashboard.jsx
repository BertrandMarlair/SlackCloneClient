import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import routes from '../../router/dashboard'
import SideBar from '../../component/SideBar/SideBar'
import { withStyles } from '@material-ui/core'
import DashboardStyle from './DashboardStyle'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const Dashboard = ({ classes }) =>{   
    const layout = useSelector(state => state.layout)
    const { isSidebarOpened } = layout

    return ( 
        <Fragment>
            <SideBar />
            <div className={clsx(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}>
                <BrowserRouter>
                    <Switch>
                        {routes.map(({ component, name, path, exact }) => {
                            return <Route path={path} component={component} key={name} exact={exact} />
                        })}
                        <Redirect to="/app/dashboard" />
                    </Switch>
                </BrowserRouter>
            </div>
        </Fragment>
    )
}

export default withStyles(DashboardStyle)(Dashboard)