import { combineReducers } from 'redux'
import person from './person'
import redirect from './redirect'
import tasksList from './tasksList'
import teamRoster from './teamRoster'
import toast from './toast'

const rootReducer = combineReducers({
    person,
    redirect,
    tasksList,
    teamRoster,
    toast
})

export default rootReducer
