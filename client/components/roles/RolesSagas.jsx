import { put, takeEvery } from 'redux-saga/effects'

import { Roles } from '../common/models'


export function* watchRoles() {yield takeEvery('FETCH_ROLES', fetchRoles)}
export function* watchAddRole() { yield takeEvery('ADD_ROLE', addRole) }
export function* watchRenameRole() { yield takeEvery('RENAME_ROLE', renameRole) }
export function* watchDeleteRole() { yield takeEvery('DELETE_ROLE', deleteRole) }

function* fetchRoles() {
  try {
    const response = yield Roles.all();
    yield put({type: 'FETCH_ROLES_SUCCEEDED', 'data': response.data})
  }
  catch (err) {
    yield put({type: 'FETCH_ROLES_FAILED', err})
  }
}

function* addRole(action) {
  try {
    const response = yield Roles.add(action.payload.name);
    yield put({type: 'ADD_ROLE_SUCCEEDED'})
    yield put({type: 'FETCH_ROLES'})
  }
  catch (err) {
    yield put({type: 'ADD_ROLE_FAILED', err})
  }
}

function* renameRole(action) {
  try {
    const response = yield Roles.rename(action.payload.id, action.payload.name);
    yield put({type: 'RENAME_ROLE_SUCCEEDED'})
    yield put({type: 'FETCH_ROLES'})
  }
  catch (err) {
    yield put({type: 'RENAME_ROLE_FAILED', err})
  }
}

function* deleteRole(action) {
  try {
    // select all tables where this Role is used to delete cascade: in future.
    // For now, Roles are not connected to any other models.
    // So delete just Roles from db.
    const response = yield Roles.delete(action.role_id)
    yield put({type: 'DELETE_ROLE_SUCCEEDED'})
    yield put({type: 'FETCH_ROLES'})
  }
  catch (err) {
    yield put({type: 'DELETE_ROLE_FAILED', err})
  }
}
