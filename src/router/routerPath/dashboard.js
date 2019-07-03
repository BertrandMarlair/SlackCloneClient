import Home from '../../container/Home/Home'
import Dash from '../../container/Dash/Dash'
import Team from '../../container/Team/Team'

const dashboardRoutes = [
    { path: '/app/dashboard', name: 'Signup', component: Dash, exact: true },
    { path: '/app/home', name: 'Signin', component: Home, exact: true },
    { path: '/app/create-team', name: 'Team', component: Team, exact: true },
]

export default dashboardRoutes