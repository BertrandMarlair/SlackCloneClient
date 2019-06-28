import Signin from '../container/Signin/Signin'
import Signup from '../container/Signup/Signup'
import Login from '../container/Login/Login'

const connectRoutes = [
    { path: '/', name: 'Login', component: Login, exact: true },
    { path: '/signin', name: 'Signin', component: Signin, exact: true },
    { path: '/signup', name: 'Signup', component: Signup, exact: true },
]

export default connectRoutes