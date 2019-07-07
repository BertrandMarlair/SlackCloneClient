const drawerWidth = 270

const DashboardStyle = () => {
    return ({
        drawerOpen: {
            height: '-webkit-fill-available',
            marginLeft: drawerWidth,
            padding: 10,
        },
        drawerClose: {
            height: '-webkit-fill-available',
            marginLeft: 95,
            padding: 10,
        },
    })
}

export default DashboardStyle