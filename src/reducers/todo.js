import {DEL} from '../actions/action-types'

export default (state = {num2: 0}, action) => {
    switch (action.type) {
        case DEL:
            return {num: state.num - action.count};
        default:
            return state
    }
}