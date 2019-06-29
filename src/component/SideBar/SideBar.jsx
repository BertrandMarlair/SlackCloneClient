import React from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from './SideBarStyle'
import { withRouter } from 'react-router-dom'
import SideLeftBar from './components/SideLeftBar'
import SideRightBar from './components/SideRightBar'

const SideBar = ({ classes }) => {
    return (
        <div className={classes.sideBar}> 
            <SideRightBar />
            <SideLeftBar />
        </div>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideBar) 