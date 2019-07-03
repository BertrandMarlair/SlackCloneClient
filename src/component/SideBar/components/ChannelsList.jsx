import React, { Fragment } from 'react'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ConnectedIcon from '@material-ui/icons/RadioButtonChecked'
import DisconnectedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { withStyles } from '@material-ui/core'
import SideBarStyle from '../SideBarStyle'
import Title from '../../Typography/Title'
import SmallTitle from '../../Typography/SmallTitle'

const ChannelsList = ({ classes, openDrawer, channels, teamName, userName }) => {
    return (
        <Fragment>
            <Divider />
            <Title>{teamName}</Title>
            <SmallTitle>{userName}</SmallTitle>
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Channels
                    </ListSubheader>
                }
            >
                {channels.map((channel) => (
                    <ListItem button key={channel.id}>
                        <ListItemText primary={channel.name} />
                    </ListItem>
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