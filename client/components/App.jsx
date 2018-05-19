/* ./client/components/App.jsx */
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import SkillsTable from './skills/SkillsTable.jsx'
import SkillForm from './skills/SkillForm.jsx'
import PersonForm from './persons/PersonForm.jsx'
import PersonsTable from './persons/PersonsTable.jsx'
import PersonalSkillsTable from './persons/PersonalSkillsTable.jsx'
import RolesTable from './roles/RolesTable.jsx'
import RoleForm from './roles/RoleForm.jsx'
import TeamsTable from './teams/TeamsTable.jsx'
import TeamForm from './teams/TeamForm.jsx'

import ErrorBoundary from './common/ErrorBoundary.jsx'
import { TopNav, LeftNav } from './LayoutHelpers.jsx'


const routes = [
  {
    path: '/',
    exact: true,
    title: "Overview",
    component: () => <h2>Overview</h2>
  },
  {
    path: '/teams',
    title: "Teams",
    component: () => <div><h2>Teams</h2><TeamForm /><TeamsTable /></div>
  },
  {
    path: '/persons',
    title: "Persons",
    component: () => <div><h2>People</h2><PersonForm /><PersonsTable /></div>
  },
  {
    path: '/skills',
    title: "Skills",
    component: () => <div><h2>Skills</h2><SkillForm /><SkillsTable /></div>
  },
  {
    path: '/roles',
    title: "Roles",
    component: () => <div><h2>Roles</h2><RoleForm /><RolesTable /></div>
  },
  {
    path: '/test',
    title: "Koval",
    component: () => <div><h2>Koval</h2><PersonalSkillsTable /></div>
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
                        <LeftNav>{routes}</LeftNav>
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
