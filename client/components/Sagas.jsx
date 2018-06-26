import axios from 'axios';
import { put, takeEvery, delay, call } from 'redux-saga/effects'
import * as models from './common/models'

export function* watchInitState() {
  yield takeEvery('INIT_STATE', initState);
}

function* initState() {
  try {
    const response = yield models.fetchModelAll('teams');
    yield put({type: 'INIT_STATE_SUCCEEDED', response})
  }
  catch (err) {
    yield put({type: 'INIT_STATE_FAILED', err})
  }
}
