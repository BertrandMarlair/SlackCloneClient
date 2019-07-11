import React from 'react'

import { compose } from 'recompose'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import {
    NotificationsNone as NotificationsIcon,
    Add as AddIcon,
    PowerSettingsNew as LogoutIcon,
} from '@material-ui/icons'
import { withStyles, Divider } from '@material-ui/core'

import SideBarStyle from '../SideBarStyle'
import Icon from '../../../component/CustomIcons/Icon'

const SideLeftBar = ({ classes, teams, inviteTeams,  history}) => {

    const dispatch = useDispatch()

    const LOGOUT = () => dispatch({ type: 'LOGOUT' })
    
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenRefresh')
        LOGOUT()
        history.push('/')
    }

    return (
        <div className={classes.sideBarLeft}>
            <div className={classes.sideTop}>
                <NavLink 
                    className={classes.logo}
                    to={'/app/dashboard'}
                >
                    <img
                        className={classes.img}
                        src="/images/logo/bfineSmall.jpg"
                        alt="logo"
                    />
                </NavLink>
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
                <Icon centered white onClick={() => logout()}><LogoutIcon className={classes.icon} /></Icon>
            </div>
        </div>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideLeftBar) 