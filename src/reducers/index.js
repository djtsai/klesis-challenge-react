import { combineReducers } from 'redux'
import person from './person'
import redirect from './redirect'
import tasksList from './tasksList'
import toast from './toast'

const rootReducer = combineReducers({
    person,
    redirect,
    tasksList,
    toast
})

export default rootReducer
