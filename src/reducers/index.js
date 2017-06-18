import { combineReducers } from 'redux'
import person from './person'
import redirect from './redirect'
import tasksList from './tasksList'
import teamRoster from './teamRoster'
import teamsList from './teamsList'
import toast from './toast'

const rootReducer = combineReducers({
    person,
    redirect,
    tasksList,
    teamRoster,
    teamsList,
    toast
})

export default rootReducer
