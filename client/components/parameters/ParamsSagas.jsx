import { put, takeEvery } from 'redux-saga/effects'

import { Params } from '../common/models'


export function* watchParams() {yield takeEvery('FETCH_PARAMS', fetchParams)}
export function* watchAddParam() { yield takeEvery('ADD_PARAM', addParam) }
export function* watchRenameParam() { yield takeEvery('RENAME_PARAM', renameParam) }
export function* watchDeleteParam() { yield takeEvery('DELETE_PARAM', deleteParam) }

function* fetchParams() {
  try {
    const response = yield Params.all();
    yield put({type: 'FETCH_PARAMS_SUCCEEDED', 'data': response.data})
  }
  catch (err) {
    yield put({type: 'FETCH_PARAMS_FAILED', err})
  }
}

function* addParam(action) {
  try {
    const response = yield Params.add(action.payload.name);
    yield put({type: 'ADD_PARAM_SUCCEEDED'})
    yield put({type: 'FETCH_PARAMS'})
  }
  catch (err) {
    yield put({type: 'ADD_PARAM_FAILED', err})
  }
}

function* renameParam(action) {
  try {
    const response = yield Params.rename(action.payload.id, action.payload.name);
    yield put({type: 'RENAME_PARAM_SUCCEEDED'})
    yield put({type: 'FETCH_PARAMS'})
  }
  catch (err) {
    yield put({type: 'RENAME_PARAM_FAILED', err})
  }
}

function* deleteParam(action) {
  try {
    // select all tables where this Param is used to delete cascade: in future.
    // For now, Params are not connected to any other models.
    // So delete just Params from db.
    const response = yield Params.delete(action.Param_id)
    yield put({type: 'DELETE_PARAM_SUCCEEDED'})
    yield put({type: 'FETCH_PARAMS'})
  }
  catch (err) {
    yield put({type: 'DELETE_PARAM_FAILED', err})
  }
}
