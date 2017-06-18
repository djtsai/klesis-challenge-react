import * as ActionTypes from '../constants/ActionTypes'
import * as API from '../middleware/api'

export function getPerson(email) {
    return dispatch => {
        API.getPerson(email).then(
            response => {
                dispatch({ type: ActionTypes.UPDATE_PERSON, value: response.body })
            },
            error => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Could not load user! Try logging out and logging back in.`,
                    toastType: 'error'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
            }
        )
    }
}
