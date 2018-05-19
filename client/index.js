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

import App from 'components/App.jsx';
import appReducer from 'components/common/reducer.jsx'

import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

import fixture from 'components/common/fixture.jsx';

const adapter = new LocalStorage('db')
const db = low(adapter)

// This is updated only when localStorage.clear() is done.
db.defaults(fixture).write()


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

const store = createStore(appReducer, db.getState(), applyMiddleware(logger));
let saveState = () => {
    db.setState(store.getState())
    db.write() // TODO what is this async?
}
store.subscribe(saveState);

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);


