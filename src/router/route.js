import Dashboard from '../layouts/Dashboard/Dashboard'
import Connect from '../layouts/Connect/Connect'

const indexRoutes = [
    { path: '/', name: 'Home', component: Dashboard, exact: true },
    { path: '/login', name: 'Login', component: Connect, exact: false },
]

export default indexRoutes