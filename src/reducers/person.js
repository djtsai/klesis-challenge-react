import * as ActionTypes from '../constants/ActionTypes'

function getInitialState() {
    return {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        teamId: 0,
        tasks: [],
        totalPoints: 0
    }
}

const initialState = getInitialState()

export default function person(state = initialState, action) {
    let newState = { ...state }

    switch (action.type) {
        case ActionTypes.UPDATE_PERSON:
            newState = action.value
            break
        case ActionTypes.RESET_PERSON:
            newState = getInitialState()
            break
        default:
            break
    }

    return newState
}
