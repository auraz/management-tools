import { put, takeEvery, delay, call, takeLatest } from 'redux-saga/effects'

import { Models } from '../common/models'
import { prepareTeamsRoles } from './TeamUtils.jsx'


export function* watchTeamsRoles() { yield takeEvery('FETCH_TEAMS_ROLES', fetchTeamsRoles)}
export function* watchAddTeamRole() { yield takeEvery('ADD_TEAM_ROLE', setTeamRole)}
export function* watchAddTeam() { yield takeEvery('ADD_TEAM', addTeam)}
export function* watchRenameTeam() { yield takeEvery('RENAME_TEAM', renameTeam)}
export function* watchDeleteTeam() { yield takeEvery('DELETE_TEAM', deleteTeam)}
export function* watchDeleteTeamRole() { yield takeEvery('DELETE_TEAM_ROLE', deleteTeamRole)}

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

function* renameTeam(action) {
  try {
    const response = yield Models.rename('teams', action.payload.id, action.payload.name)
    yield put({type: 'RENAME_TEAM_SUCCEEDED'})
    yield put({type: 'FETCH_TEAMS_ROLES'})
  }
  catch (err) {
    yield put({type: 'RENAME_TEAM_FAILED', err})
  }
}

function* deleteTeam(action) {
  try {
    // select all tables where this team is used to delete cascade:
    // TeamsRoles, get team_roles id, where this team is listed
    const teamRolesForTeam = yield Models.TeamsRolesForTeam(action.team_id);
    // now get id's of that list
    const teamRolesIDs = teamRolesForTeam.data.map(e => e.id)
    // now delete that teamRoles
    const deleteResponse1 =  Models.DeleteList('teams_roles', teamRolesIDs)

    // delete team
    const response = yield Models.deleteOne('teams', action.team_id)

    yield put({type: 'DELETE_TEAM_SUCCEEDED'})
    yield put({type: 'FETCH_TEAMS_ROLES'})
  }
  catch (err) {
    yield put({type: 'DELETE_TEAM_FAILED', err})
  }
}

function* deleteTeamRole(action) {
  try {
    const response = yield Models.deleteTeamRole(action.role_id, action.team_id)
    yield put({type: 'DELETE_TEAM_ROLE_SUCCEEDED'})
    yield put({type: 'FETCH_TEAMS_ROLES'})
  }
  catch (err) {
    yield put({type: 'DELETE_TEAM_ROLE_FAILED', err})
  }
}
