import { put, takeEvery } from 'redux-saga/effects'
import { Models } from './common/models'

export function* watchInitState() {
  yield takeEvery('INIT_STATE', initState);
}

function* initState() {
  try {
    const response = yield Models.TeamsRoles();
    yield put({type: 'INIT_STATE_SUCCEEDED', response})
  }
  catch (err) {
    yield put({type: 'INIT_STATE_FAILED', err})
  }
}
