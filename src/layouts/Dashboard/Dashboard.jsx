import React, { Fragment } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import SideBar from '../../component/SideBar/SideBar'
import { withStyles } from '@material-ui/core'
import DashboardStyle from './DashboardStyle'

const Dashboard = ({ children, classes }) =>{   
    const layout = useSelector(state => state.layout)
    const { isSidebarOpened } = layout

    return ( 
        <Fragment>
            <SideBar />
            <div className={clsx(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}>
                {children}
            </div>
        </Fragment>
    )
}

export default withStyles(DashboardStyle)(Dashboard)