import * as ActionTypes from '../constants/ActionTypes'

export default function teamRoster(state = [], action) {
    switch (action.type) {
        case ActionTypes.UPDATE_TEAM_ROSTER:
            return action.value
        default:
            return state
    }
}
