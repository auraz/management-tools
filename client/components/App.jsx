/*
    ./client/components/App.jsx
*/
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Roles from './Roles.jsx'


// import PersonForm from './components/PersonForm.jsx'
// import PersonList from './components/PersonList.jsx'
import { TopNav, LeftNav } from './LayoutHelpers.jsx'

const routes = [
  { path: '/',
    exact: true,
    component: () => <h2>Overview</h2>
  },
  { path: '/teams',
    component: () => <h2>Teams</h2>
  },
  { path: '/people',
    component: () => <h2>People</h2>
  },
  { path: '/roles',
    component: () => <Roles/>
  }
]

var basename = "";
if (git.branch.includes('gh-pages')) {
    basename = "/management-tools/dist" // Basename for gh-pages should be repo name + dist.
}

export default class App extends React.Component {
  render() {
    return (
        <Router basename={basename}>
        <div>
            <TopNav/>
            <div className="container-fluid">
                <div className="row">
                    <LeftNav/>

                    <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                    <h1>Vision</h1>
                    <section className="row text-center placeholders">
                        <div className="col-6">
                            {routes.map((route, index) => (
                                  <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                  />
                            ))}
                        </div>
                    </section>
                    </main>

                </div>
            </div>
        </div>
        </Router>
        );
    }
}
