import * as constants from './actions.jsx';

function appReducer(state, action) {
  switch (action.type) {
    case constants.UPDATE_SKILL_LEVEL: return updateSkinillLevel(state, action.payload)

    case constants.UPDATE_SKILL_NAME: return updateModelName(state, 'skills', action.payload)

    case constants.ADD_PARAM_PERSON: return addParamPerson(state, action.payload)
    case constants.ADD_SKILL_PERSON: return addSkillPerson(state, action.payload)

    case constants.ADD_PERSON_ROLE: return addPersonRole(state, action.payload)
    case constants.ADD_PERSON_TEAM: return addPersonTeam(state, action.payload)

    case constants.DELETE_ROW_FROM_MODEL: return deleteRowFromModel(state, action.payload)

    case constants.INIT_STATE: return {loading: true}
    case constants.INIT_STATE_SUCCEEDED: return {loading: false, allRoles: action.allRoles }
    case constants.INIT_STATE_FAILED: return {loading: false, error: action.err}

    default: return state ? state :  {loading: false}
  }
}


export default appReducer
