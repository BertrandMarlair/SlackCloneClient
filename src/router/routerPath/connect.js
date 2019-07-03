import Signin from '../../container/Signin/Signin'
import Login from '../../container/Login/Login'

const connectRoutes = [
    { path: '/connect/signin', name: 'Signin', component: Signin, exact: true },
    { path: '/connect/login', name: 'Login', component: Login, exact: true },
]

export default connectRoutes