import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import layout from '../reducers/sideBarConfig'

const rootReducer = combineReducers({
    layout
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

function configureStore() {
    return store
}

export default configureStore