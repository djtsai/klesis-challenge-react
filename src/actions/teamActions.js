import * as ActionTypes from '../constants/ActionTypes'
import * as API from '../middleware/api'

export function getTeams() {
    return dispatch => {
        API.getTeams().then(
            response => {
                dispatch({ type: ActionTypes.UPDATE_TEAMS_LIST, value: response.body })
            },
            error => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Could not get teams!`,
                    toastType: 'error'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
            }
        )
    }
}
