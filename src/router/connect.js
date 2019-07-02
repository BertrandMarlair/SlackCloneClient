import Signin from '../container/Signin/Signin'
import Signup from '../container/Signup/Signup'
import Home from '../container/Home/Home'

const connectRoutes = [
    { path: '/', name: 'Home', component: Home, exact: true },
    { path: '/login/signin', name: 'Signin', component: Signin, exact: true },
    { path: '/login/signup', name: 'Signup', component: Signup, exact: true },
]

export default connectRoutes