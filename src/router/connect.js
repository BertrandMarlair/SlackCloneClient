import Signin from '../container/Signin/Signin'
import Signup from '../container/Signup/Signup'

const connectRoutes = [
    { path: '/login/signin', name: 'Signin', component: Signin, exact: true },
    { path: '/login/signup', name: 'Signup', component: Signup, exact: true },
]

export default connectRoutes