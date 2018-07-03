import { put, takeEvery } from 'redux-saga/effects'
import { Models } from './common/models'

export function* watchInitState() {
  yield takeEvery('INIT_STATE', initState);
}

function* initState() {
  try {
    const response = yield Models.all('roles');
    const allRoles = response.data;
    yield put({type: 'INIT_STATE_SUCCEEDED', allRoles: allRoles})
  }
  catch (err) {
    yield put({type: 'INIT_STATE_FAILED', err})
  }
}


export function* watchRenameParam() {
  yield takeEvery('UPDATE_PARAM', renameParam);
}

function* renameParam(action) {
  if (action.payload.model == 'teams') {
    try {
      const response = yield Models.rename(
        'teams', action.payload.id, action.payload.name,
      );

      yield put({type: 'RENAME_TEAM_SUCCEEDED'})
      yield put({type: 'FETCH_TEAMS_ROLES'})
    }
    catch (err) {
      yield put({type: 'RENAME_TEAM_FAILED', err})
    }
  }

}
