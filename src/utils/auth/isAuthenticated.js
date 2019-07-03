import decode from 'jwt-decode'

const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    try {
        decode(token)
        decode(refreshToken)
    } catch (err) {
        return false
    }
    return true
}

export default isAuthenticated