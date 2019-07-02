const NotificationStyle = theme => {
    return ({
        notificationContainer: {
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 3px 7px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
        },
        notificationContained: {
            borderRadius: 45,
            height: 45,
        },
        notificationIconContainer: {
            minWidth: 45,
            height: 45,
            borderRadius: 45,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
        },
        notificationIconContainerContained: {
            fontSize: 15,
            color: '#FFFFFF80',
        },
        notificationIconContainerRounded: {
            marginRight: theme.spacing(2),
        },
        containedTypography: {
            color: 'white'
        },
        messageContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            paddingRight: 30,
        },
        extraButton: {
            color: 'white',
            '&:hover, &:focus': {
                background: 'transparent',
            }
        },
    })
}

export default NotificationStyle