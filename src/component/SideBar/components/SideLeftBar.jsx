import React from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from '../SideBarStyle'
import { withRouter } from 'react-router-dom'
import {
    NotificationsNone as NotificationsIcon,
} from '@material-ui/icons'
import Icon from '../../../component/CustomIcons/Icon'

const SideLeftBar = ({ classes }) => {
    return (
        <div className={classes.sideBarLeft}>
            <div className={classes.sideTop}>
                <div className={classes.logo}>
                    <img
                        className={classes.img}
                        src="/images/logo/rexel.png"
                        alt="logo"
                    />
                </div>
                <Icon centered white><NotificationsIcon className={classes.icon} /></Icon>
            </div>
            <div className={classes.sideBottom}>
                <Icon centered white><NotificationsIcon className={classes.icon} /></Icon>
                <Icon centered white><NotificationsIcon className={classes.icon} /></Icon>
                <Icon centered white><NotificationsIcon className={classes.icon} /></Icon>
                <Icon centered white><NotificationsIcon className={classes.icon} /></Icon>
            </div>
        </div>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideLeftBar) 