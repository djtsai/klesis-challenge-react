import * as ActionTypes from '../constants/ActionTypes'
import * as API from '../middleware/api'
import * as Auth from '../utils/authManagement'

export function login(email) {
    return dispatch => {
        API.getPerson(email).then(
            response => {
                Auth.login(response.body.id, response.body.email)
                dispatch({ type: ActionTypes.UPDATE_PERSON, value: response.body })
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Welcome back ${email}!`,
                    toastType: 'success'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
                dispatch({ type: ActionTypes.SET_REDIRECT, url: '/' })
                dispatch({ type: ActionTypes.RESET_REDIRECT })
            },
            error => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Could not login ${email}! Check if your email has been registered.`,
                    toastType: 'error'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
            }
        )
    }
}

export function logout() {
    Auth.logout()

    return { type: ActionTypes.RESET_PERSON }
}
