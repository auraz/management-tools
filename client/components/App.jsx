import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { connect } from "react-redux";

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import Skills from './skills/Skills.jsx'

import Persons from './persons/Persons.jsx'
import PersonView from './persons/PersonView.jsx'

import Roles from './roles/Roles.jsx'

import Teams from './teams/Teams.jsx'
import TeamView from './teams/TeamView.jsx'

import Params from './parameters/Params.jsx'


import ErrorBoundary from './common/ErrorBoundary.jsx'
import { TopNav, LeftNav } from './LayoutHelpers.jsx'


const routes = [
  {
    path: '/',
    exact: true,
    title: "Test render",
    component: () => <Persons/>,
  },
  {
    path: '/teams',
    exact: true,
    title: "Teams",
    component: () => <Teams/>,
    type: 'LeftNav'
  },
  {
    path: '/persons',
    title: "Persons",
    component: () => <Persons/>,
    type: 'LeftNav'
  },
  {
    path: '/skills',
    title: "Skills",
    component: () =>  <Skills/>,
    type: 'LeftNav'
  },
  {
    path: '/roles',
    title: "Roles",
    component: () => <Roles/>,
    type: 'LeftNav'
  },
  {
    path: '/params',
    title: "Parameters",
    component: () => <Params/>,
    type: 'LeftNav'
  },
  {
    path: '/team/:id',
    title: "Team",
    component: TeamView
  },
  {
    path: '/person/:id',
    title: "Person",
    component: PersonView
  }
]


class App extends React.Component {

  render() {
    return (
        <Router basename="">
            <ErrorBoundary>
                <TopNav/>
                <div className="container-fluid">
                    <div className="row">
                        <LeftNav>{routes.filter(e => e.type=='LeftNav')}</LeftNav>
                        <main className="col-sm-9 col-md-10 pt-3">
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </main>
                    </div>
                </div>
            </ErrorBoundary>
        </Router>
        );
    }
}

App = DragDropContext(HTML5Backend)(App);

export default App;
