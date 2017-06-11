import { combineReducers } from 'redux'
import person from './person'
import redirect from './redirect'
import toast from './toast'

const rootReducer = combineReducers({
    person,
    redirect,
    toast
})

export default rootReducer
