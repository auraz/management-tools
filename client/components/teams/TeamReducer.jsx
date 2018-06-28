import * as constants from './TeamActions.jsx';

function log(state, action, new_state) {
  console.log("REDUCER DATA",state, action)
  return new_state;
}

function TeamReducer(state, action) {
  switch (action.type) {
    // case constants.ADD_TEAM: return addData(state, action.payload, 'teams')

    // case constants.UPDATE_TEAM_NAME: return updateModelName(state, 'teams', action.payload)

    // case constants.ADD_TEAM_ROLE: return addTeamRole(state, action.payload)

    case constants.FETCH_TEAMS_ROLES: return log(state, action, {loading: false, TeamsRoles: action.parsed })
    case constants.TEAMS_ROLES_SUCCEEDED: return log(state, action, {loading: false, TeamsRoles: action.data })
    case constants.TEAMS_ROLES_FAILED: return log(state, action, {loading: false, TeamsRoles: action.parsed })

    default: return state ? state : {loading: false}
  }
}

export default TeamReducer