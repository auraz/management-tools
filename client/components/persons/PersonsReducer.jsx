import * as constants from './PersonActions.jsx';

function log(state, action, new_state) {
  console.log("Persons reducer",state, action)
  return new_state;
}

function TeamReducer(state, action) {
  switch (action.type) {
    case constants.ADD_PERSON: return log(state, action, state)
    case constants.ADD_PERSON_SUCCEEDED: return log(state, action, state)
    case constants.ADD_PERSON_FAILED: return log(state, action, state)

    case constants.RENAME_PERSON: return log(state, action, state)
    case constants.RENAME_PERSON_SUCCEEDED: return log(state, action, state)
    case constants.RENAME_PERSON_FAILED: return log(state, action, state)

    case constants.DELETE_PERSON: return log(state, action, state)
    case constants.DELETE_PERSON_SUCCEEDED: return log(state, action, state)
    case constants.DELETE_PERSON_FAILED: return log(state, action, state)

    default: return state ? state : {loading: false}
  }
}

export default PersonsReducer
