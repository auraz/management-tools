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
import thunk from 'redux-thunk';


import App from 'components/App.jsx';
import appReducer from 'components/common/reducer.jsx'

import { fetchModelAll } from 'components/common/models.jsx'


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

const store = createStore(appReducer, {}, applyMiddleware(thunk, logger));
ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);


