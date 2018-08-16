import * as constants from './ParamsActions.jsx';

function log(state, action, new_state) {
  console.log("Params reducer", state, action)
  return new_state;
}

function ParamsReducer(state, action) {
  switch (action.type) {

    case constants.FETCH_PARAMS: return log(state, action, {loading: true})
    case constants.FETCH_PARAMS_SUCCEEDED: return log(state, action, {loading: false, params: action.data})
    case constants.FETCH_PARAMS_FAILED: return log(state, action, state)

    case constants.ADD_PARAM: return log(state, action, state)
    case constants.ADD_PARAM_SUCCEEDED: return log(state, action, state)
    case constants.ADD_PARAM_FAILED: return log(state, action, state)

    case constants.RENAME_PARAM: return log(state, action, state)
    case constants.RENAME_PARAM_SUCCEEDED: return log(state, action, state)
    case constants.RENAME_PARAM_FAILED: return log(state, action, state)

    case constants.DELETE_PARAM: return log(state, action, state)
    case constants.DELETE_PARAM_SUCCEEDED: return log(state, action, state)
    case constants.DELETE_PARAM_FAILED: return log(state, action, state)

    default: return state ? state : {loading: false}
  }
}

export default ParamsReducer
