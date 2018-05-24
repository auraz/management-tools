import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import SkillsTable from './skills/SkillsTable.jsx'
import SkillForm from './skills/SkillForm.jsx'

import PersonForm from './persons/PersonForm.jsx'
import PersonsTable from './persons/PersonsTable.jsx'
import PersonView from './persons/PersonView.jsx'

import RolesTable from './roles/RolesTable.jsx'
import RoleForm from './roles/RoleForm.jsx'

import TeamsTable from './teams/TeamsTable.jsx'
import TeamForm from './teams/TeamForm.jsx'
import TeamView from './teams/TeamView.jsx'

import ErrorBoundary from './common/ErrorBoundary.jsx'
import { TopNav, LeftNav } from './LayoutHelpers.jsx'


const routes = [
  // {
  //   path: '/',
  //   exact: true,
  //   title: "Overview",
  //   component: () => <h2>Overview</h2>
  // },
  {
    path: '/teams',
    exact: true,
    title: "Teams",
    component: () => <div><h2>Teams</h2><TeamForm /><TeamsTable /></div>,
    type: 'LeftNav'
  },
  {
    path: '/persons',
    title: "Persons",
    component: () => <div><h2>People</h2><PersonForm /><PersonsTable /></div>,
    type: 'LeftNav'
  },
  {
    path: '/skills',
    title: "Skills",
    component: () => <div><h2>Skills</h2><SkillForm /><SkillsTable /></div>,
    type: 'LeftNav'
  },
  {
    path: '/roles',
    title: "Roles",
    component: () => <div><h2>Roles</h2><RoleForm /><RolesTable /></div>,
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


export default DragDropContext(HTML5Backend)(App)
