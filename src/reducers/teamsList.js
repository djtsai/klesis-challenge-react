import * as ActionTypes from '../constants/ActionTypes'

export default function teamsList(state = [], action) {
    switch (action.type) {
        case ActionTypes.UPDATE_TEAMS_LIST:
            return action.value
        default:
            return state
    }
}
