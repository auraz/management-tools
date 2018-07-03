import * as constants from './TeamActions.jsx';

function log(state, action, new_state) {
  console.log("REDUCER DATA",state, action)
  return new_state;
}

function TeamReducer(state, action) {
  switch (action.type) {
    case constants.ADD_TEAM: return log(state, action, state)
    case constants.ADD_TEAM_SUCCEEDED: return log(state, action, state)
    case constants.ADD_TEAM_FAILED: return log(state, action, state)

    case constants.FETCH_TEAMS_ROLES: return log(state, action, {loading: false, TeamsRoles: action.parsed })
    case constants.TEAMS_ROLES_SUCCEEDED: return log(state, action, {loading: false, TeamsRoles: action.data })
    case constants.TEAMS_ROLES_FAILED: return log(state, action, {loading: false, TeamsRoles: action.parsed })

    case constants.ADD_TEAM_ROLE: return log(state, action, state)
    case constants.ADD_TEAM_ROLE_SUCCEEDED: return log(state, action, state)
    case constants.ADD_TEAM_ROLE_FAILED: return log(state, action, state)

    case constants.RENAME_TEAM: return log(state, action, state)
    case constants.RENAME_TEAM_SUCCEEDED: return log(state, action, state)
    case constants.RENAME_TEAM_FAILED: return log(state, action, state)

    case constants.DELETE_TEAM: return log(state, action, state)
    case constants.DELETE_TEAM_SUCCEEDED: return log(state, action, state)
    case constants.DELETE_TEAM_FAILED: return log(state, action, state)

    default: return state ? state : {loading: false}
  }
}

export default TeamReducer
