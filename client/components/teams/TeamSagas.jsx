import axios from 'axios';
import { put, takeEvery, delay, call, takeLatest } from 'redux-saga/effects'

import { Models } from '../common/models'

import { prepareTeamsRoles } from './TeamUtils.jsx'


export function* watchTeamsRoles() {
  yield takeEvery('FETCH_TEAMS_ROLES', fetchTeamsRoles);
}

function* fetchTeamsRoles() {
  try {
    const response = yield Models.TeamsRoles();
    const parsed = prepareTeamsRoles(response.data)
    yield put({type: 'TEAMS_ROLES_SUCCEEDED', 'data': parsed})
  }
  catch (err) {
    yield put({type: 'TEAMS_ROLES_FAILED', err})
  }
}
