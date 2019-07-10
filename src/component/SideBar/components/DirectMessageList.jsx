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

import SideBarStyle from '../SideBarStyle'
import Icon from '../../CustomIcons/Icon'


const DirectMessageList = ({ classes, openDrawer, setOpenAddDirectMessageModal, teamId, directMessageMembers }) => {
    return (
        <Fragment>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" className={classes.subHeaderChannel}>
                        <span>Direct messages</span>
                        {true && (
                            <Icon
                                centered
                                onClick={() => setOpenAddDirectMessageModal(true)}
                            >
                                <AddIcon className={classes.icon} />
                            </Icon>
                        )}
                    </ListSubheader>
                }
            >
                {directMessageMembers.map((user, index) => (
                    <Link key={`directMessage${user.id}`} to={`/app/view-team/user/${teamId}/${user.id}`}>
                        <ListItem button >
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
                            <ListItemText primary={user.username} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
        </Fragment>
    )
}

export default withStyles(SideBarStyle)(DirectMessageList)