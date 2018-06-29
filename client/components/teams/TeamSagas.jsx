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

export function* watchAddTeamRole() {
  yield takeEvery('ADD_TEAM_ROLE', setTeamRole);
}

function* setTeamRole(action) {
  try {
    const response = yield Models.attachTeamRole(action.payload.role_id, action.payload.team_id);
    yield put({type: 'ADD_TEAM_ROLE_SUCCEEDED'})
    yield put({type: 'FETCH_TEAMS_ROLES'})
  }
  catch (err) {
    yield put({type: 'ADD_TEAM_ROLE_FAILED', err})
  }
}


export function* watchAddTeam() {
  yield takeEvery('ADD_TEAM', addTeam);
}

function* addTeam(action) {
  try {
    const response1 = yield Models.addBase('teams', action.name)
    const team_id = parseInt(response1.headers.location.split('.').pop())

    // attach Team Lead role to every team:
    const response2 = yield Models.attachTeamRole(60, team_id)
    yield put({type: 'ADD_TEAM_SUCCEEDED'})
    yield put({type: 'ADD_TEAM_ROLE_SUCCEEDED'})
    yield put({type: 'FETCH_TEAMS_ROLES'})
  }
  catch (err) {
    yield put({type: 'ADD_TEAM_FAILED', err})
  }
}
