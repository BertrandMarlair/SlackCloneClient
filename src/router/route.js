import Main from '../layouts/Main'
import Login from '../layouts/Login'

const indexRoutes = [
    { path: '/', name: 'Home', component: Main, exact: true },
    { path: '/login', name: 'Login', component: Login, exact: false },
]

export default indexRoutes