/*
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from 'components/App.jsx';
import RolesReducer from 'components/roles/reducer.jsx'

import 'bootstrap/dist/css/bootstrap.css';
import 'components/common/dashboard.css';

const store = createStore(RolesReducer);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    ,    document.getElementById('root')
);
