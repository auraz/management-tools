import * as constants from './action.jsx';


function RolesReducer (state={}, action) {
    switch (action.type) {
        case constants.SAVE_ROLE:
            return {
                ...state,
                "roles": [...state.roles, action.payload],
            }
        default:
            return {...state}
    }
}

export default RolesReducer
