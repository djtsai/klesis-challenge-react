import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
    show: false,
    message: '',
    type: ''
}

export default function toast(state = initialState, action) {
    const newState = { ...state }

    switch (action.type) {
        case ActionTypes.UPDATE_TOAST:
            newState.show = true
            newState.message = action.toastMessage
            newState.type = action.toastType
            break
        case ActionTypes.RESET_TOAST:
            return { ...initialState }
        default:
            break
    }

    return newState
}
