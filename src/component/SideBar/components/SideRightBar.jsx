import React, { useState, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from '../SideBarStyle'
import { withRouter } from 'react-router-dom'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import Icon from '../../../component/CustomIcons/Icon'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { useSelector, useDispatch } from 'react-redux'

const SideRightBar = ({ classes }) => {
    const [hover, setHover] = useState(false)
    const layout = useSelector(state => state.layout)
    const dispatch = useDispatch()
    const { isSidebarOpened } = layout

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
                    {isSidebarOpened ?
                        <ChevronLeftIcon
                            className={classes.iconToolBar}
                        />
                        :
                        <ChevronRightIcon
                            className={classes.iconToolBar}
                        />
                    }
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
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? 
                                        <InboxIcon 
                                            className={clsx(classes.icon, {
                                                [classes.drawerOpenIcon]: openDrawer,
                                                [classes.drawerCloseIcon]: !openDrawer,
                                            })}
                                        /> 
                                    : 
                                        <MailIcon 
                                            className={clsx(classes.icon, {
                                                [classes.drawerOpenIcon]: openDrawer,
                                                [classes.drawerCloseIcon]: !openDrawer,
                                            })}
                                        />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ?
                                        <InboxIcon
                                            className={clsx(classes.icon, {
                                                [classes.drawerOpenIcon]: openDrawer,
                                                [classes.drawerCloseIcon]: !openDrawer,
                                            })}
                                        />
                                        :
                                        <MailIcon
                                            className={clsx(classes.icon, {
                                                [classes.drawerOpenIcon]: openDrawer,
                                                [classes.drawerCloseIcon]: !openDrawer,
                                            })}
                                        />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        </Fragment>
    )
}

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideRightBar) 