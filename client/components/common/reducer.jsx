import {combineReducers} from "redux";

import * as constants from './action.jsx';


function appReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return {...state, "persons": [...state.persons, action.payload],}
    case constants.ADD_ROLE: return {...state, "roles": [...state.roles, action.payload],}
    case constants.ADD_SKILL: return {...state, "skills": [...state.skills, action.payload],}
    case constants.ADD_TEAM: return {...state, "teams": [...state.teams, action.payload],}
    default: return state
  }
}


export default appReducer
