import Home from '../../container/Home/Home'
import Dash from '../../container/Dash/Dash'
import CreateTeam from '../../container/Team/CreateTeam'
import ViewTeam from '../../container/Team/ViewTeam'

const dashboardRoutes = [
    { path: '/app/dashboard', name: 'Signup', component: Dash, exact: true },
    { path: '/app/home', name: 'Signin', component: Home, exact: true },
    { path: '/app/create-team', name: 'CreateTeam', component: CreateTeam, exact: true },
    { path: '/app/view-team/:teamId?/:channelId?', name: 'ViewTeam', component: ViewTeam, exact: true },
]

export default dashboardRoutes