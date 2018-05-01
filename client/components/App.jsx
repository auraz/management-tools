/* ./client/components/App.jsx */
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Roles from './roles/Roles.jsx'
import RolesForm from './roles/RolesForm.jsx'
import ErrorBoundary from './common/ErrorBoundary.jsx'


import SkillsTable from './skills/SkillsTable.jsx'
import PersonForm from './person/PersonForm.jsx'
import PersonList from './person/PersonList.jsx'
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
    component: () => <div><h2>Teams</h2></div>
  },
  {
    path: '/people',
    title: "People",
    component: () => <div><h2>People</h2><PersonForm /><PersonList /></div>
  },
  {
    path: '/skills',
    title: "Skills",
    component: () => <div><h2>Skills</h2><SkillsTable /></div>
  },
  {
    path: '/roles',
    title: "Roles",
    component: () => <div className="row"><RolesForm/><Roles/></div>
  }
]


export default class App extends React.Component {
  render() {
    return (
        <Router basename={basename}>
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
