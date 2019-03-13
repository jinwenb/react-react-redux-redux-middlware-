import {ADD} from '../actions/action-types'

export default (state = {num: 0}, action) => {
    switch (action.type) {
        case ADD:
            return {num: state.num + action.payload};
        default:
            return state
    }
}