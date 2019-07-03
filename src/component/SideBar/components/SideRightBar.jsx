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

const SideRightBar = ({ classes, channels, teamName }) => {
    const [hover, setHover] = useState(false)
    const layout = useSelector(state => state.layout)
    const connected = useSelector(state => state.connected)
    const dispatch = useDispatch()
    const { isSidebarOpened } = layout
    const { user } = connected

    const TOGGLE_SIDEBAR = () => dispatch({ type: 'Layout/TOGGLE_SIDEBAR' })

    function handleDrawerHover(state) {
        if (!isSidebarOpened){
            setHover(state)
        }
    }

    function handleDrawerClose() {
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
                        <ChevronLeftIcon
                            className={classes.iconToolBar}
                        />
                    ) : (
                        <ChevronRightIcon
                            className={classes.iconToolBar}
                        />
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
                    <ChannelsList openDrawer={openDrawer} channels={channels} teamName={teamName} userName={user.username}/>
                    <MessagesList />
                </Drawer>
            </div>
        </Fragment>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideRightBar) 