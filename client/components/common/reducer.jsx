import {combineReducers} from "redux";

import * as constants from './action.jsx';

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


function appReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return {...state, "persons": [...state.persons, action.payload],}
    case constants.ADD_ROLE: return {...state, "roles": [...state.roles, action.payload],}
    case constants.ADD_SKILL: return {...state, "skills": [...state.skills, action.payload],}
    case constants.ADD_TEAM: return {...state, "teams": [...state.teams, action.payload],}
    case constants.UPDATE_SKILL_LEVEL: return updateSkillLevel(state, action.payload)
    case constants.UPDATE_PERSON_NAME: return updateModelName(state, 'persons', action.payload)
    case constants.UPDATE_ROLE_NAME: return updateModelName(state, 'roles', action.payload)
    case constants.UPDATE_TEAM_NAME: return updateModelName(state, 'teams', action.payload)
    case constants.UPDATE_SKILL_NAME: return updateModelName(state, 'skills', action.payload)
    default: return state
  }
}


export default appReducer
