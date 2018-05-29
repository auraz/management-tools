import {combineReducers} from "redux";
import  * as models from "./models";
import * as constants from './actions.jsx';


function addPerson(state, name) {
  models.insertBaseModel('persons', name);
  return {...state, "persons": models.fetchModelAll('persons')}
}

function addRole(state, name) {
  models.insertBaseModel('roles', name);
  return {...state, "roles": models.fetchModelAll('roles')}
}

function addSkill(state, name) {
  models.insertBaseModel('skills', name);
  return {...state, "skills": models.fetchModelAll('skills')}
}

function addTeam(state, name) {
  models.insertBaseModel('teams', name);
  return {...state, "teams": models.fetchModelAll('teams')}
}

function updateParam(state, payload) {
  models.updateModelName(payload.model, payload.id, payload.name)
  state[payload.model] = models.fetchModelAll(payload.model)
  return {...state}
}

function appReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return addPerson(state, action.payload)
    case constants.ADD_ROLE: return addRole(state, action.payload)
    case constants.ADD_SKILL: return addSkill(state, action.payload)
    case constants.ADD_TEAM: return addTeam(state, action.payload)
    case constants.UPDATE_PARAM: return updateParam(state, action.payload)
    case constants.UPDATE_SKILL_LEVEL: return updateSkillLevel(state, action.payload)
    case constants.UPDATE_PERSON_NAME: return updateModelName(state, 'persons', action.payload)
    case constants.UPDATE_ROLE_NAME: return updateModelName(state, 'roles', action.payload)
    case constants.UPDATE_TEAM_NAME: return updateModelName(state, 'teams', action.payload)
    case constants.UPDATE_SKILL_NAME: return updateModelName(state, 'skills', action.payload)
    case constants.UPDATE_PARAMETER_NAME: return updateParamName(state, action.payload)
    case constants.ADD_PARAMETER: return addParam(state, action.payload)
    case constants.ADD_PARAMETER_TO_PERSON: return addParamToPerson(state, action.payload)
    case constants.ADD_SKILL_TO_PERSON: return addSkillToPerson(state, action.payload)
    default: return state
  }
}


export default appReducer
