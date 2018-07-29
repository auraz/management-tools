import axios from 'axios';
import { put, takeEvery, delay, call, takeLatest } from 'redux-saga/effects'

import { Models } from '../common/models'

export function* watchPersons() {
  yield takeEvery('FETCH_PERSONS', fetchPersons);
}

function* fetchPersons() {
  try {
    const response = yield Models.Persons();
    
    yield put({type: 'FETHC_PERSONS_SUCCEEDED', 'data': parsed})
  }
  catch (err) {
    yield put({type: 'FETCH_PERSONS_FAILED', err})
  }
}

export function* watchAddPerson() {
  yield takeEvery('ADD_PERSON', addPerson);
}

function* addPerson(action) {
  try {
    const response = yield Models.addPerson(action.payload.person_name);
    yield put({type: 'ADD_PERSON_SUCCEEDED'})
    yield put({type: 'FETCH_PERSONS'})
  }
  catch (err) {
    yield put({type: 'ADD_PERSON_FAILED', err})
  }
}

export function* watchDeletePerson() {
  yield takeEvery('DELETE_PERSON', deletePerson);
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
