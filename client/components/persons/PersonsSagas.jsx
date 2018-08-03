import { put, takeEvery, delay, call, takeLatest } from 'redux-saga/effects'

import { Persons } from '../common/models'


export function* watchPersons() {yield takeEvery('FETCH_PERSONS', fetchPersons)}
export function* watchAddPerson() { yield takeEvery('ADD_PERSON', addPerson) }
export function* watchRenamePerson() { yield takeEvery('RENAME_PERSON', renamePerson) }
export function* watchDeletePerson() { yield takeEvery('DELETE_PERSON', deletePerson) }

function* fetchPersons() {
  try {
    const response = yield Persons.all();
    yield put({type: 'FETCH_PERSONS_SUCCEEDED', 'data': response.data})
  }
  catch (err) {
    yield put({type: 'FETCH_PERSONS_FAILED', err})
  }
}

function* addPerson(action) {
  try {
    const response = yield Persons.add(action.payload.name);
    yield put({type: 'ADD_PERSON_SUCCEEDED'})
    yield put({type: 'FETCH_PERSONS'})
  }
  catch (err) {
    yield put({type: 'ADD_PERSON_FAILED', err})
  }
}

function* renamePerson(action) {
  try {
    const response = yield Persons.rename(action.payload.id, action.payload.name);
    yield put({type: 'RENAME_PERSON_SUCCEEDED'})
    yield put({type: 'FETCH_PERSONS'})
  }
  catch (err) {
    yield put({type: 'RENAME_PERSON_FAILED', err})
  }
}

function* deletePerson(action) {
  try {
    // select all tables where this person is used to delete cascade:
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
