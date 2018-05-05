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
import RolesReducer from 'components/common/reducer.jsx'



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
    // do not forget to localStorage.clear() after updating this list:
    // byt sometimes it just works
    roles: [
        "Developer",
        "DevOPS",
        "QA",
        "Architect",
        "Lead",
        "Product Owner",
        "Project Coordinator",
        "Team Coordinator",
        "Test 3"
    ],
    grades: [
        "Junior",
        "Middle",
        "Senior",
        "Lead",
    ],
    persons: {
        "Vladas": {
            skills: {

            }
        },
        "Indra":  {
            skills: {

            }
        },
        "Koval": [
                ["Devops Architecture", "Enough"],
                ["Delivery in time", "Not Enough"],
            ],
        },
    teams: [
        "Web development",
        "DevOPS"
    ],
    vladas: [
        "str": "communication",
        "weak": "initiative"
    ]
}

const store = createStore(RolesReducer, initialState, applyMiddleware(logger));

function saveState() {
    console.log(localStorage, "fdsfsdf")
    localStorage.setItem(NAMESPACE, JSON.stringify(this.getState()));
    console.log(localStorage, "fdsfsdf")
}

store.subscribe(saveState.bind(store));


ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);


