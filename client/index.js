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


const adapter = new LocalStorage('db')
const db = low(adapter)

// Should be valid JSON, otherwise localStorage did not updated.
db.defaults({
  "roles": [
    "Developer",
    "DevOPS",
    "QA",
    "Architect",
    "Lead",
    "Product Owner",
    "Project Coordinator",
    "Team Coordinator",
  ],
  "grades": [
      "Junior",
      "Middle",
      "Senior",
      "Lead"
  ],
  "persons": [
      "Vladas",
      "Indra",
      "Alex Koval"
  ],
  "persons_skills": {
    "Vladas": [
      ["Communication", "Enough"],
      ["Initiative", "Not Enough"]
    ],
    "Indra":  [
    ],
    "Koval": [
      ["Devops Architecture", "Enough"],
      ["Delivery in time", "Not Enough"]
    ]
  },
  "teams": [
    "Web development",
    "DevOPS"
  ],
  "skills": [
    "Javascript",
    "Python",
    "Django",
    "React",
    "Redux",
    "Php"
  ]
}).write()


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


