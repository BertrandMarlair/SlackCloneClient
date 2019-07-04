import React, { Fragment } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import { Add as AddIcon } from '@material-ui/icons'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ConnectedIcon from '@material-ui/icons/RadioButtonChecked'
import DisconnectedIcon from '@material-ui/icons/RadioButtonUnchecked'

import Icon from '../../CustomIcons/Icon'
import SideBarStyle from '../SideBarStyle'
import Title from '../../Typography/Title'
import SmallTitle from '../../Typography/SmallTitle'

const ChannelsList = ({ classes, openDrawer, channels, team, userName, setOpenAddChannelModal }) => {
    return (
        <Fragment>
            <Divider />
            <Title>{team && team.name}</Title>
            <SmallTitle>{userName}</SmallTitle>
            <List
                subheader={
                    <ListSubheader component="div" className={classes.subHeaderChannel}>
                        <span>Channels</span>
                        <Icon 
                            centered 
                            onClick={() => setOpenAddChannelModal(true)}
                        >
                            <AddIcon className={classes.icon} />
                        </Icon>
                    </ListSubheader>
                }
            >
                {channels.map((channel) => (
                    <Link key={channel.id} to={`/app/view-team/${team.id}/${channel.id}`}>
                        <ListItem button>
                            <ListItemText primary={channel.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Direct Message
                    </ListSubheader>
                }
            >
                {['coucou, test'].map((channel, index) => (
                    <ListItem button key={channel}>
                        <ListItemIcon>
                            {index === 0 ?
                                <ConnectedIcon
                                    className={clsx(classes.icon, {
                                        [classes.drawerOpenIcon]: openDrawer,
                                        [classes.drawerCloseIcon]: !openDrawer,
                                    }, classes.conncetedIcon)}
                                />
                                :
                                <DisconnectedIcon
                                    className={clsx(classes.icon, {
                                        [classes.drawerOpenIcon]: openDrawer,
                                        [classes.drawerCloseIcon]: !openDrawer,
                                    }, classes.disConncetedIcon)}
                                />
                            }
                        </ListItemIcon>
                        <ListItemText primary={channel} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Fragment>
    )
}

export default withStyles(SideBarStyle)(ChannelsList)