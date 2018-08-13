import * as constants from './SkillsActions.jsx';

function log(state, action, new_state) {
  console.log("Skills reducer", state, action)
  return new_state;
}

function SkillsReducer(state, action) {
  switch (action.type) {

    case constants.FETCH_SKILLS: return log(state, action, {loading: true})
    case constants.FETCH_SKILLS_SUCCEEDED: return log(state, action, {loading: false, skills: action.data})
    case constants.FETCH_SKILLS_FAILED: return log(state, action, state)

    case constants.ADD_SKILL: return log(state, action, state)
    case constants.ADD_SKILL_SUCCEEDED: return log(state, action, state)
    case constants.ADD_SKILL_FAILED: return log(state, action, state)

    case constants.RENAME_SKILL: return log(state, action, state)
    case constants.RENAME_SKILL_SUCCEEDED: return log(state, action, state)
    case constants.RENAME_SKILL_FAILED: return log(state, action, state)

    case constants.DELETE_SKILL: return log(state, action, state)
    case constants.DELETE_SKILL_SUCCEEDED: return log(state, action, state)
    case constants.DELETE_SKILL_FAILED: return log(state, action, state)

    default: return state ? state : {loading: false}
  }
}

export default SkillsReducer
