import axios from 'axios';
import { put, takeEvery, delay, call } from 'redux-saga/effects'
import { Models } from '../common/models'
import { prepareTeamsRoles } from '../common/utils.jsx'

export function* watchTeamsRoles() {
  yield takeEvery('FETCH_TEAMS_ROLES', fetchTeamsRoles);
}

function* fetchTeamsRoles() {
  try {
    const response = yield Models.all('teams_roles');
    // const parsed = prepareTeamsRoles(response.data)
    yield put({type: 'TEAMS_ROLES_SUCCEEDED', response})
  }
  catch (err) {
    yield put({type: 'TEAMS_ROLES_FAILED', err})
  }
}
