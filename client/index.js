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
import RolesReducer from 'components/roles/reducer.jsx'



const NAMESPACE = "MANAGMENT-TOOLS:v0"


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


const initialState = JSON.parse(localStorage.getItem(NAMESPACE)) || {
    roles: [
        "Developer",
        "DevOPS",
        "QA",
        "Architect",
        "Lead",
        "Product Owner",
        "Project Coordinator",
        "Team Coordinator",
    ],
    grades: [
        "Junior",
        "Middle",
        "Senior",
        "Lead",
    ]
}

const store = createStore(RolesReducer, initialState, applyMiddleware(logger));


/**
 * Saves currsent state to the localStorage
 */
function saveState() {
    localStorage.setItem(NAMESPACE, JSON.stringify(this.getState()));
}
store.subscribe(saveState.bind(store));


ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);
