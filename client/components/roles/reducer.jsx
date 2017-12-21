import * as constants from './action.jsx';

const initialState = {
     roles: [
                "Developer",
                "DevOPS",
                "QA",
                "Architect",
                "Lead",
                "Product Owner",
                "Project Coordinator",
                "Team Coordinator",
            ],
    grades: [
        "Junior",
        "Middle",
        "Senior",
        "Lead",
        ]
}

function RolesReducer (state=initialState, action) {
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
