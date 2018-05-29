import {combineReducers} from "redux";
import { insertTeam, fetchModelAll } from "./dbActions";

import * as constants from './action.jsx';


function updateParamName(state, data) {
  let table_data = state[data.param_table]
  let output = table_data.filter(
    el => !(el.id == data.id)
  )
  output.push(
    { id: data.id, name: data.name },
  );
  state[data.param_table] = output;
  return {...state}
}


function updateModelName(state, model, data) {
  let table_data = state[model]
  let output = table_data.filter(
    el => !(el.id == data.id)
  )
  output.push(
    { id: data.id, name: data.name },
  );
  state[model] = output;
  return {...state}
}

function updateSkillLevel(state, data) {
  let persons_skills = state.persons_skills;
  let output = persons_skills.filter(
    el => !(el.person_id == data.person_id && el.skill_id == data.skill_id)
  )
  output.push(
    { id: persons_skills.length + 1, person_id: data.person_id, skill_id: data.skill_id, level_id: data.level_id },
  );
  return {...state, "persons_skills": output}
}


function addParam(state, data){
  let table_data = state[data.param_table]
  table_data.push(
    { id: table_data.length + 1, name: data.name },
  );
  state[data.param_table] = table_data;
  return {...state}
}


function addParamToPerson(state, data){
  let param_table = state[data.param_table]
  let new_param_id = param_table.length + 1;
  param_table.push({ id: new_param_id , name: data.name });
  state[data.param_table] = param_table;
  let persons_param_table = state[data.persons_param_table]
  persons_param_table.push(
    { id: persons_param_table.length + 1, person_id: data.person_id, param_id: new_param_id },
  );
  state[data.persons_param_table] = persons_param_table;
  return {...state}
}

function addSkillToPerson(state, data){
  let skills_table = state.skills
  let new_skill_id = skills_table.length + 1;
  skills_table.push({ id: new_skill_id , name: data.name });
  state.skills = skills_table;
  let persons_skills_table = state.persons_skills;
  persons_skills_table.push(
    { id: persons_skills_table.length + 1, person_id: data.person_id, skill_id: new_skill_id, level_id: 1 },
  );
  state.persons_skills = persons_skills_table;
  return {...state}
}

function addTeam(state, team_name) {
  insertTeam(team_name);
  return {...state, "teams": fetchModelAll('teams')}
}

function appReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return {...state, "persons": [...state.persons, { id: state.persons.length+1, name: action.payload} ]}
    case constants.ADD_ROLE: return {...state, "roles": [...state.roles, { id: state.roles.length+1, name: action.payload} ]}
    case constants.ADD_SKILL: return {...state, "skills": [...state.skills, { id: state.skills.length+1, name: action.payload} ]}
    case constants.ADD_TEAM: return addTeam(state, action.payload)
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
