import * as ActionTypes from '../constants/ActionTypes'

export default function tasksList(state = [], action) {
    switch (action.type) {
        case ActionTypes.UPDATE_TASKS_LIST:
            return action.value
        default:
            return state
    }
}
