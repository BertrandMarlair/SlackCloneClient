import { primaryColor } from '../../style/constant'

const drawerWidth = 200

const SideBarStyle = theme => {
    return ({
        sideBar: {
            position: 'fixed',
            display: 'flex',
        },
        sideBarLeft: {
            width: 70,
            background: primaryColor,
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px 0',
        },
        logo: {
            width: '80%',
            margin: 'auto',
        },
        img: {
            width: '100%',
        },
        sideBarRight: {
            width: 25,
            background: 'white',
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px 0',
            left: 70,
            position: 'absolute'
        },
        sideBarControl: {
            width: 150,
            height: '100vh',
            zIndex: 1200,
            position: 'absolute',
            userSelect: 'none',
            left: 270,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            left: 70,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            left: 70,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: 25,
            },
        },
        drawerOpenIcon: {
            color: 'inherit',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerCloseIcon: {
            color: 'transparent',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'absolute',
            top: 20,
            zIndex: 1201,
            background: 'white',
            borderRadius: '50%',
            border: '1px solid #c5c5c5',
            width: 25,
            height: 25,
            left: 82,
        },
        drawerOpenToolBar: {
            left: 257,
            transition: theme.transitions.create('left', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerCloseToolBar: {
            left: 82,
            transition: theme.transitions.create('left', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        iconToolBar: {
            fontSize: 12,
        },
        iconButton: {
            padding: 6
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
}

export default SideBarStyle