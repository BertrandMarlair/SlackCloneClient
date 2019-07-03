export const initialState = {
    connected: localStorage.getItem('token') ? true : false,
}

export const CONNECTED = 'CONNECTED'

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
        default:
            return state
    }
}
