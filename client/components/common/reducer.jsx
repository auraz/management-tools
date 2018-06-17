import {combineReducers} from "redux";
import  * as models from "./models";
import * as constants from './actions.jsx';


function addData(state, name, table_name) {
  models.insertBaseModel(table_name, name);
  state[table_name] = models.fetchModelAll(table_name)
  return {...state}
}

function updateParam(state, payload) {
  models.updateModelName(payload.model, payload.id, payload.name)
  state[payload.model] = models.fetchModelAll(payload.model)
  return {...state}
}

function addSkillPerson(state, payload) {
  models.attachSkillPerson(payload.skill_id, payload.person_id)
  state.persons_skills = models.fetchModelAll('persons_skills')
  return {...state}
}

function addParamPerson(state, payload) {
  models.attachParamPerson(payload.param_model, payload.param_id, payload.person_id)
  var model = "persons_" + payload.param_model;
  state[model] = models.fetchModelAll(model)
  return {...state}
}

function addTeamRole(state, payload) {
  models.attachTeamRole(payload.role_id, payload.team_id)
  state.teams_roles = models.fetchModelAll('teams_roles')
  return {...state}
}

function addPersonRole(state, payload) {
  models.attachPersonRole(payload.role_id, payload.person_id)
  state.persons_roles = models.fetchModelAll('persons_roles')
  return {...state}
}
function addPersonTeam(state, payload) {
  models.attachPersonTeam(payload.person_id, payload.team_id)
  state.persons_teams = models.fetchModelAll('persons_teams')
  return {...state}
}

function deleteRowFromModel(state, payload) {
  models.deleteRowFromModel(payload.model, payload.id)
  state[payload.model] =  models.fetchModelAll(payload.model)
  return {...state}
}

function getInitialState() {
  models.fixturesToDb()
  // return {
  //   'teams': models.fetchModelAll('teams'),
  //   'persons': models.fetchModelAll('persons'),
  //   'roles': models.fetchModelAll('roles'),
  //   'skills': models.fetchModelAll('skills'),
  // }
  return {}
}

// function initState(state, payload) {
//   models.fetchModelAll('teams').then( (res) => state.teams = res)
//   models.fetchModelAll('persons').then( (res) => state.teams = res)
//   models.fetchModelAll('teams').then( (res) => state.teams = res)
//   models.fetchModelAll('teams').then( (res) => state.teams = res)
//   models.fetchModelAll('teams').then( (res) => state.teams = res)
//   models.fetchModelAll('teams').then( (res) => state.teams = res)
//   return {
//     teams:
//     persons: fetchModelAll('persons'),
//     skills: fetchModelAll('skills'),
//     roles: fetchModelAll('roles'),
//     params: fetchModelAll('params')
//   }
// }

// }

function appReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return addData(state, action.payload, 'persons')
    case constants.ADD_ROLE: return addData(state, action.payload, 'roles')
    case constants.ADD_SKILL: return addData(state, action.payload, 'skills')
    case constants.ADD_TEAM: return addData(state, action.payload, 'teams')
    case constants.ADD_PARAM: return addData(state, action.payload, 'params')

    case constants.UPDATE_PARAM: return updateParam(state, action.payload)
    case constants.UPDATE_SKILL_LEVEL: return updateSkillLevel(state, action.payload)
    case constants.UPDATE_PERSON_NAME: return updateModelName(state, 'persons', action.payload)
    case constants.UPDATE_ROLE_NAME: return updateModelName(state, 'roles', action.payload)
    case constants.UPDATE_TEAM_NAME: return updateModelName(state, 'teams', action.payload)
    case constants.UPDATE_SKILL_NAME: return updateModelName(state, 'skills', action.payload)
    case constants.UPDATE_PARAMETER_NAME: return updateParamName(state, action.payload)

    case constants.ADD_PARAM_PERSON: return addParamPerson(state, action.payload)
    case constants.ADD_SKILL_PERSON: return addSkillPerson(state, action.payload)
    case constants.ADD_TEAM_ROLE: return addTeamRole(state, action.payload)
    case constants.ADD_PERSON_ROLE: return addPersonRole(state, action.payload)
    case constants.ADD_PERSON_TEAM: return addPersonTeam(state, action.payload)

    case constants.DELETE_ROW_FROM_MODEL: return deleteRowFromModel(state, action.payload)

    case constants.INIT_STATE: return getInitialState(state, action.payload)


    default: return state
  }
}


export default appReducer
