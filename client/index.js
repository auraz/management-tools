/*
    ./client/index.js
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/common/dashboard.css';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'

import App from 'components/App.jsx';

import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import createSagaMonitor from 'components/sagaMonitor.jsx'

import { watchInitState, watchRenameParam } from 'components/Sagas.jsx'
import {
  watchTeamsRoles,
  watchAddTeamRole,
  watchAddTeam,
  watchRenameTeam,
  watchDeleteTeam,
  watchDeleteTeamRole
} from 'components/teams/TeamSagas.jsx'

import {
  watchPersons,
  watchAddPerson,
  watchRenamePerson,
  watchDeletePerson,
} from 'components/persons/PersonsSagas.jsx'

import {
  watchSkills,
  watchAddSkill,
  watchRenameSkill,
  watchDeleteSkill,
} from 'components/skills/SkillsSagas.jsx'

import {
  watchRoles,
  watchAddRole,
  watchRenameRole,
  watchDeleteRole,
} from 'components/roles/RolesSagas.jsx'

import appReducer from 'components/common/reducer.jsx'
import TeamReducer from 'components/teams/TeamReducer.jsx'
import PersonsReducer from 'components/persons/PersonsReducer.jsx'
import SkillsReducer from 'components/skills/SkillsReducer.jsx'
import RolesReducer from 'components/roles/RolesReducer.jsx'


const reducers = combineReducers({
  appReducer,
  TeamReducer,
  PersonsReducer,
  SkillsReducer,
  RolesReducer,
})


function logger({getState}) {
    return next => action => {
        console.log('will dispatch', action);
        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action);
        console.log('state after dispatch', getState());
        // This will likely be the action itself, unless a middleware further in chain changed it.
        return returnValue;
    }
}

const config = {
  level: 'log',
  effectTrigger: true,
  effectResolve: true,
  actionDispatch: true
}

const sagaMiddleware = createSagaMiddleware({sagaMonitor: createSagaMonitor(config)})
const store = createStore(reducers, {},  applyMiddleware(logger, sagaMiddleware));

function* rootSaga() {
  yield all([
    watchInitState(),
    watchTeamsRoles(),
    watchAddTeamRole(),
    watchAddTeam(),
    watchRenameTeam(),
    watchDeleteTeam(),
    watchRenameParam(),
    watchDeleteTeamRole(),
    watchPersons(),
    watchAddPerson(),
    watchRenamePerson(),
    watchDeletePerson(),
    watchSkills(),
    watchAddSkill(),
    watchRenameSkill(),
    watchDeleteSkill(),
    watchRoles(),
    watchAddRole(),
    watchRenameRole(),
    watchDeleteRole()
  ])
}

sagaMiddleware.run(rootSaga)

store.dispatch({type: "INIT_STATE"})

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);
