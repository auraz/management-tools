import * as constants from './RolesActions.jsx';

function log(state, action, new_state) {
  console.log("Roles reducer", state, action)
  return new_state;
}

function RolesReducer(state, action) {
  switch (action.type) {

    case constants.FETCH_ROLES: return log(state, action, {loading: true})
    case constants.FETCH_ROLES_SUCCEEDED: return log(state, action, {loading: false, roles: action.data})
    case constants.FETCH_ROLES_FAILED: return log(state, action, state)

    case constants.ADD_ROLE: return log(state, action, state)
    case constants.ADD_ROLE_SUCCEEDED: return log(state, action, state)
    case constants.ADD_ROLE_FAILED: return log(state, action, state)

    case constants.RENAME_ROLE: return log(state, action, state)
    case constants.RENAME_ROLE_SUCCEEDED: return log(state, action, state)
    case constants.RENAME_ROLE_FAILED: return log(state, action, state)

    case constants.DELETE_ROLE: return log(state, action, state)
    case constants.DELETE_ROLE_SUCCEEDED: return log(state, action, state)
    case constants.DELETE_ROLE_FAILED: return log(state, action, state)

    default: return state ? state : {loading: false}
  }
}

export default RolesReducer
