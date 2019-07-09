import Home from '../../container/Home/Home'
import Dash from '../../container/Dash/Dash'
import CreateTeam from '../../container/Team/CreateTeam'
import ViewTeam from '../../container/Team/ViewTeam'
import ViewUser from '../../container/User/ViewUser'

const dashboardRoutes = [
    { path: '/app/dashboard', name: 'Dashboard', component: Dash, exact: true },
    { path: '/app/home', name: 'Home', component: Home, exact: true },
    { path: '/app/create-team', name: 'CreateTeam', component: CreateTeam, exact: true },
    { path: '/app/view-team/:teamId?/:channelId?', name: 'ViewTeam', component: ViewTeam, exact: true },
    { path: '/app/view-team/user/:teamId/:userId', name: 'Viewser', component: ViewUser, exact: true },
]

export default dashboardRoutes