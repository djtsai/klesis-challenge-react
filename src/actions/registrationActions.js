import * as ActionTypes from '../constants/ActionTypes'
import * as API from '../middleware/api'

export function register(email, firstName, lastName) {
    return dispatch => {
        API.postPerson(email, firstName, lastName).then(
            response => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Successfully registered ${email}!`,
                    toastType: 'success'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
                dispatch({ type: ActionTypes.SET_REDIRECT, url: '/login' })
                dispatch({ type: ActionTypes.RESET_REDIRECT })
            },
            error => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Could not register ${email}!`,
                    toastType: 'error'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
            }
        )
    }
}
