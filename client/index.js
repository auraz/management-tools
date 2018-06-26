/*
    ./client/index.js
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/common/dashboard.css';
// import 'babel-polyfill'
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import createSagaMiddleware from 'redux-saga'
import { call, put, takeEvery, delay, all, race, fork, spawn, take, select } from 'redux-saga/effects'
import createSagaMonitor from 'components/sagaMonitor.jsx'

import App from 'components/App.jsx';
import appReducer from 'components/common/reducer.jsx'

import { watchInitState } from './components/Sagas.jsx'



function logger({getState}) {
    return next => action => {
        console.log('will dispatch', action);
        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action);
        console.log('state after dispatch', getState());
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
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
const store = createStore(appReducer, {loading: false, teams: [], err: null}, applyMiddleware(logger, sagaMiddleware));



function* rootSaga() {
  yield [
    watchInitState(),
  ]
}

sagaMiddleware.run(rootSaga)
// const action = type => store.dispatch({type})
store.dispatch({type: "INIT_STATE"})
store.dispatch({type: "INIT_STATE"})

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);


