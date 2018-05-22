import {combineReducers} from "redux";

import * as constants from './action.jsx';


function updatePersonName(state, data) {
  let persons = state.persons;
  let output = persons.filter(
    el => !(el.id == data.person_id)
  )
  output.push(
    { id: data.person_id, name: data.person_name },
  );
  return {...state, "persons": output}
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
    case constants.UPDATE_PERSON_NAME: return updatePersonName(state, action.payload)
    default: return state
  }
}


export default appReducer
