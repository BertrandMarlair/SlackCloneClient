import Home from '../container/Home/Home'
import Dash from '../container/Dash/Dash'

const connectRoutes = [
    { path: '/app/dashboard', name: 'Signup', component: Dash, exact: true },
    { path: '/app/home', name: 'Signin', component: Home, exact: true },
]

export default connectRoutes