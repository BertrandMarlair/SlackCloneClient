import React from 'react'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core'
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
        </List>
    )
}

export default withStyles(SideBarStyle)(MessagesList)