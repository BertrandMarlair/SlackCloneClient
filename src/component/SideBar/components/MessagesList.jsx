import React from 'react'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Add as AddIcon } from '@material-ui/icons'

import Icon from '../../CustomIcons/Icon'
import SideBarStyle from '../SideBarStyle'

const MessagesList = ({ setOpenInviteUserToTeamModal, classes, isOwner }) => {
    return (
        <List
            subheader={
                <ListSubheader component="div" className={classes.subHeaderChannel}>
                    <span>Invite User</span>
                    {isOwner && (
                        <Icon
                            centered
                            onClick={() => setOpenInviteUserToTeamModal(true)}
                        >
                            <AddIcon className={classes.icon} />
                        </Icon>
                    )}
                </ListSubheader>
            }
        >
            {['coucou', 'test'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    )
}

export default withStyles(SideBarStyle)(MessagesList)