import notify from '../../component/Notification/Notification'
import { toggleConnection } from '../../reducers/connectConfig'
import configureStore from '../../store/store'
var store = configureStore()

const authFailed = (history, link) => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    notify({
        type: 'report',
        message: 'You are not authentified, please logon before',
        variant: 'contained',
        color: 'secondary'
    })
    store.dispatch(toggleConnection(false))
    if (history) {
        history.push(link ? link : '/connect/login')
    }
}

export default authFailed