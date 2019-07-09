const MessagingStyle = theme => {
    return ({
        containerMessage: {
            height: '-webkit-fill-available',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        hiddenButton: {
            display: 'none',
        },
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        messages: {
            display: 'flex',
            flexDirection: 'column-reverse',
            overflowY: 'scroll',
            height: '80vh',
        },
        headerMessage: {
            display: 'flex',
            justifyContent: 'space-between',
        }
    })
}

export default MessagingStyle