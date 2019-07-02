import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import layout from '../reducers/sideBarConfig'
import connected from '../reducers/connectConfig'

const rootReducer = combineReducers({
    layout,
    connected
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

function configureStore() {
    return store
}

export default configureStore