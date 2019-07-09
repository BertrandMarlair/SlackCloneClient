import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import { Add as AddIcon } from '@material-ui/icons'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import Icon from '../../CustomIcons/Icon'
import SideBarStyle from '../SideBarStyle'
import Title from '../../Typography/Title'
import SmallTitle from '../../Typography/SmallTitle'

const ChannelsList = ({ classes, openDrawer, channels, team, userName, isOwner, setOpenAddChannelModal }) => {
    return (
        <Fragment>
            <Divider />
            <Title>{team && team.name}</Title>
            <SmallTitle>{userName}</SmallTitle>
            <List
                subheader={
                    <ListSubheader component="div" className={classes.subHeaderChannel}>
                        <span>Channels</span>
                        {isOwner && (
                            <Icon 
                                centered 
                                onClick={() => setOpenAddChannelModal(true)}
                            >
                                <AddIcon className={classes.icon} />
                            </Icon>
                        )}
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
        </Fragment>
    )
}

export default withStyles(SideBarStyle)(ChannelsList)