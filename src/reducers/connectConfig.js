import decode from 'jwt-decode'


export const getUserData = () => {
    try {
        const token = localStorage.getItem('token')
        const { user } = decode(token) 
        return user
    } catch (err){
        return false
    }
}

export const initialState = {
    connected: localStorage.getItem('token') ? true : false,
    user: getUserData()
}

export const CONNECTED = 'CONNECTED'
export const LOGOUT = 'LOGOUT'

export const toggleConnection = () => ({
    type: CONNECTED,
})

export default function LoginReducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case CONNECTED:
            return {
                ...state,
                connected: payload,
            }
        case LOGOUT:
            return {
                user: {},
                connected: false,
            }
        default:
            return state
    }
}
