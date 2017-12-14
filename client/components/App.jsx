/*
    ./client/components/App.jsx
    1) Question, why components is working dir? (if i set client in webpack context.) !!!!!!!!!!!!!!!!!!!!!!!!
    2) Where to store css? per component, like dashboard
    3) How handle get request to /roles

*/
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

// import PersonForm from './components/PersonForm.jsx'
// import PersonList from './components/PersonList.jsx'
import { TopNav, LeftNav, MainPart, Table } from './LayoutHelpers.jsx'


export default class App extends React.Component {
  render() {
    return (
        <Router>
        <div>
            <TopNav/>
            <div className="container-fluid">
                <div className="row">
                    <LeftNav/>

                        {/*<Route path="/teams" component={Teams}/>*/}
                        {/*<Route path="/people" c omponent={People}/>*/}
        <MainPart/>

        {/*<h2>Forms</h2>*/}

        {/*<PersonForm/>*/}

        {/*<PersonList/>*/}

        {/*<div className="table-responsive">*/}
            {/*<Table/>*/}
        {/*</div>*/}

                </div>
            </div>
        </div>
        </Router>
        );
    }
}
