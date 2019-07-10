import React, { useState, Fragment } from 'react'
import clsx from 'clsx'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import ChannelsList from './ChannelsList'
import MessagesList from './MessagesList'
import DirectMessageList from './DirectMessageList'

import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import SideBarStyle from '../SideBarStyle'
import Icon from '../../../component/CustomIcons/Icon'
import CreateChannel from '../../../component/Channel/CreateChannel'
import InviteUserToTeam from '../../../component/Team/InviteUserToTeam'
import InviteUserToDirectMessage from '../../DirectMessage/InviteUserToDirectMessage'

const SideRightBar = ({ classes, channels, team, directMessageMembers, createChannelMutation, createUserInvitelMutation }) => {

    const [hover, setHover] = useState(false)
    const [openAddChannelModal, setOpenAddChannelModal] = useState(false)
    const [openInviteUserToTeamModal, setOpenInviteUserToTeamModal] = useState(false)
    const [openAddDirectMessageModal, setOpenAddDirectMessageModal] = useState(false)
    const layout = useSelector(state => state.layout)
    const connected = useSelector(state => state.connected)
    const dispatch = useDispatch()
    const { isSidebarOpened } = layout
    const { user } = connected

    const TOGGLE_SIDEBAR = () => dispatch({ type: 'Layout/TOGGLE_SIDEBAR' })

    const handleDrawerHover = (state) => {
        if (!isSidebarOpened){
            setHover(state)
        }
    }

    const handleDrawerClose = () => {
        TOGGLE_SIDEBAR(!isSidebarOpened)
        setHover(!isSidebarOpened)
    }

    const openDrawer = isSidebarOpened || hover
    const isOwner = team && team.admin

    return (
        <Fragment>
            {hover && !isSidebarOpened &&
                <div 
                    className={classes.sideBarControl}
                    onMouseOut={() => handleDrawerHover(false)}
                />
            }
            <div
                className={clsx(classes.toolbar, {
                    [classes.drawerOpenToolBar]: openDrawer,
                    [classes.drawerCloseToolBar]: !openDrawer,
                })}
            >
                <Icon onClick={handleDrawerClose} className={classes.iconButton}>
                    {isSidebarOpened ? (
                        <ChevronLeftIcon className={classes.iconToolBar}/>
                    ) : (
                        <ChevronRightIcon className={classes.iconToolBar}/>
                    )}
                </Icon>
            </div>
            <div 
                className={classes.sideBarRight}
                onMouseEnter={() => handleDrawerHover(true)}
            > 
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: openDrawer,
                        [classes.drawerClose]: !openDrawer,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: openDrawer,
                            [classes.drawerClose]: !openDrawer,
                        }),
                    }}
                    open={openDrawer}
                >
                    <ChannelsList 
                        openDrawer={openDrawer} 
                        channels={channels} 
                        team={team} 
                        isOwner={isOwner}
                        userName={user.name}
                        setOpenAddChannelModal={setOpenAddChannelModal}
                    />
                    <MessagesList 
                        isOwner={isOwner}
                        setOpenInviteUserToTeamModal={setOpenInviteUserToTeamModal} 
                    />
                    <DirectMessageList 
                        openDrawer={openDrawer} 
                        directMessageMembers={directMessageMembers}
                        setOpenAddDirectMessageModal={setOpenAddDirectMessageModal}
                        teamId={team ? team.id : null}
                />
                </Drawer>
            </div>
            <CreateChannel 
                teamId={team ? team.id : null}
                openAddChannelModal={openAddChannelModal} 
                setOpenAddChannelModal={setOpenAddChannelModal} 
                createChannelMutation={createChannelMutation}
            />
            <InviteUserToTeam 
                teamId={team ? team.id : null}
                openInviteUserToTeamModal={openInviteUserToTeamModal} 
                setOpenInviteUserToTeamModal={setOpenInviteUserToTeamModal} 
                createUserInvitelMutation={createUserInvitelMutation}
            />
            <InviteUserToDirectMessage
                teamId={team ? team.id : null}
                openAddDirectMessageModal={openAddDirectMessageModal} 
                setOpenAddDirectMessageModal={setOpenAddDirectMessageModal} 
                createUserInvitelMutation={createUserInvitelMutation}
            />
        </Fragment>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideRightBar) 