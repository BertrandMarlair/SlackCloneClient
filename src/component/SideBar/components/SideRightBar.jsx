import React, { useState, Fragment } from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core'
import SideBarStyle from '../SideBarStyle'
import { withRouter } from 'react-router-dom'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import Icon from '../../../component/CustomIcons/Icon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useSelector, useDispatch } from 'react-redux'
import ChannelsList from './ChannelsList'
import MessagesList from './MessagesList'
import CreateChannel from '../../../component/Channel/CreateChannel'

const SideRightBar = ({ classes, channels, team, createChannelMutation }) => {

    const [hover, setHover] = useState(false)
    const [openAddChannelModal, setOpenAddChannelModal] = useState(false)
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
                        userName={user.username}
                        setOpenAddChannelModal={setOpenAddChannelModal}
                    />
                    <MessagesList />
                </Drawer>
            </div>
            <CreateChannel 
                teamId={team ? team.id : null}
                openAddChannelModal={openAddChannelModal} 
                setOpenAddChannelModal={setOpenAddChannelModal} 
                createChannelMutation={createChannelMutation}
            />
        </Fragment>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideRightBar) 