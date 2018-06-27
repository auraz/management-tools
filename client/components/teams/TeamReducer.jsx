import * as constants from './TeamActions.jsx';

function TeamReducer(state, action) {
  switch (action.type) {
    // case constants.ADD_TEAM: return addData(state, action.payload, 'teams')

    // case constants.UPDATE_TEAM_NAME: return updateModelName(state, 'teams', action.payload)

    // case constants.ADD_TEAM_ROLE: return addTeamRole(state, action.payload)

    case constants.FETCH_TEAMS_ROLES: return {loading: false, TeamsRoles: action.response.data }

    default: return state ? state : {loading: false}
  }
}

export default TeamReducer
