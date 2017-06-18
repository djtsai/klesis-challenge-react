import * as ActionTypes from '../constants/ActionTypes'
import * as API from '../middleware/api'
import * as PersonActions from './personActions'
import * as TeamActions from './teamActions'

export function getTasks() {
    return dispatch => {
        API.getTasks().then(
            response => {
                dispatch({ type: ActionTypes.UPDATE_TASKS_LIST, value: response.body })
            },
            error => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Could not get tasks!`,
                    toastType: 'error'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
            }
        )
    }
}

export function addCompletedTask(personId, taskId) {
    return (dispatch, getState) => {
        API.postTask(personId, taskId).then(
            response => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Added completed task!`,
                    toastType: 'success'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
                PersonActions.getPerson(getState().person.email)(dispatch)
                TeamActions.getTeams()(dispatch)
            },
            error => {
                dispatch({
                    type: ActionTypes.UPDATE_TOAST,
                    toastMessage: `Could not add completed task!`,
                    toastType: 'error'
                })
                dispatch({ type: ActionTypes.RESET_TOAST })
            }
        )
    }
}
