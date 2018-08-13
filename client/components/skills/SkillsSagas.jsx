import { put, takeEvery } from 'redux-saga/effects'

import { Skills } from '../common/models'


export function* watchSkills() {yield takeEvery('FETCH_SKILLS', fetchSkills)}
export function* watchAddSkill() { yield takeEvery('ADD_SKILL', addSkill) }
export function* watchRenameSkill() { yield takeEvery('RENAME_SKILL', renameSkill) }
export function* watchDeleteSkill() { yield takeEvery('DELETE_SKILL', deleteSkill) }

function* fetchSkills() {
  try {
    const response = yield Skills.all();
    yield put({type: 'FETCH_SKILLS_SUCCEEDED', 'data': response.data})
  }
  catch (err) {
    yield put({type: 'FETCH_SKILLS_FAILED', err})
  }
}

function* addSkill(action) {
  try {
    const response = yield Skills.add(action.payload.name);
    yield put({type: 'ADD_SKILL_SUCCEEDED'})
    yield put({type: 'FETCH_SKILLS'})
  }
  catch (err) {
    yield put({type: 'ADD_SKILL_FAILED', err})
  }
}

function* renameSkill(action) {
  try {
    const response = yield Skills.rename(action.payload.id, action.payload.name);
    yield put({type: 'RENAME_SKILL_SUCCEEDED'})
    yield put({type: 'FETCH_SKILLS'})
  }
  catch (err) {
    yield put({type: 'RENAME_SKILL_FAILED', err})
  }
}

function* deleteSkill(action) {
  try {
    // select all tables where this Skill is used to delete cascade: in future.
    // For now, Skills are not connected to any other models.
    // So delete just Skills from db.
    const response = yield Skills.delete(action.skill_id)
    yield put({type: 'DELETE_SKILL_SUCCEEDED'})
    yield put({type: 'FETCH_SKILLS'})
  }
  catch (err) {
    yield put({type: 'DELETE_SKILL_FAILED', err})
  }
}
