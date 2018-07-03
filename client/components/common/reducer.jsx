import  * as models from "./models";
import * as constants from './actions.jsx';

function appReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return addData(state, action.payload, 'persons')
    case constants.ADD_ROLE: return addData(state, action.payload, 'roles')
    case constants.ADD_SKILL: return addData(state, action.payload, 'skills')
    case constants.ADD_TEAM: return addData(state, action.payload, 'teams')
    case constants.ADD_PARAM: return addData(state, action.payload, 'params')

    case constants.UPDATE_PARAM: return {loading: true, ...state}
    case constants.UPDATE_SKILL_LEVEL: return updateSkillLevel(state, action.payload)
    case constants.UPDATE_PERSON_NAME: return updateModelName(state, 'persons', action.payload)
    case constants.UPDATE_ROLE_NAME: return updateModelName(state, 'roles', action.payload)
    case constants.UPDATE_TEAM_NAME: return updateModelName(state, 'teams', action.payload)
    case constants.UPDATE_SKILL_NAME: return updateModelName(state, 'skills', action.payload)
    case constants.UPDATE_PARAMETER_NAME: return updateParamName(state, action.payload)

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
