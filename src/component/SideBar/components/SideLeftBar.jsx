import React from 'react'
import { withStyles, Divider } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from '../SideBarStyle'
import { withRouter } from 'react-router-dom'
import {
    NotificationsNone as NotificationsIcon,
    Add as AddIcon,
} from '@material-ui/icons'
import { NavLink } from 'react-router-dom'
import Icon from '../../../component/CustomIcons/Icon'

const SideLeftBar = ({ classes, teams, inviteTeams,  history}) => {
    return (
        <div className={classes.sideBarLeft}>
            <div className={classes.sideTop}>
                <div className={classes.logo}>
                    <img
                        className={classes.img}
                        src="/images/logo/bfineSmall.jpg"
                        alt="logo"
                    />
                </div>
                {teams.map(team => (
                    <Icon 
                        key={team.id} 
                        centered 
                        white 
                        className={classes.teamIcon}
                        onClick={() => history.push(`/app/view-team/${team.id}`)}
                    >
                        {team.name.charAt(0).toUpperCase()}
                    </Icon>
                ))}
                <Divider />
                {inviteTeams.map(team => (
                    <Icon 
                        key={team.id} 
                        centered 
                        white 
                        className={classes.teamIcon}
                        onClick={() => history.push(`/app/view-team/${team.id}`)}
                    >
                        {team.name.charAt(0).toUpperCase()}
                    </Icon>
                ))}
            </div>
            <div className={classes.sideBottom}>
                <NavLink to={'/app/create-team'}>
                    <Icon centered white><AddIcon className={classes.icon} /></Icon>
                </NavLink>
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