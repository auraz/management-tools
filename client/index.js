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

import shortid from 'shortid'


const adapter = new LocalStorage('db')
const db = low(adapter)

// Should be valid JSON, otherwise localStorage did not updated.
// This is updated only when app is restarted.
db.defaults({
  "roles": [
    { id: shortid.generate(), name:"Developer"           },
    { id: shortid.generate(), name:"DevOPS"              },
    { id: shortid.generate(), name:"QA"                  },
    { id: shortid.generate(), name:"Architect"           },
    { id: shortid.generate(), name:"Lead"                },
    { id: shortid.generate(), name:"Product Owner"       },
    { id: shortid.generate(), name:"Project Coordinator" },
    { id: shortid.generate(), name:"Team Coordinator"    }
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
  persons_teams: [
  ],
  "skills": [
    "Javascript",
    "Python",
    "Django",
    "React",
    "Redux",
    "Php",
    "Communication",
    "Initiative",
    "Devops Architecture",
    "Delivery in time"
  ],
  levels: [
    "Enough",
    "Not enough{ id: shoritid.generate(), name:"
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


