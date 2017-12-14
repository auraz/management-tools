/*
    ./client/components/App.jsx
    Question, why components is working dir? (if i set client in webpack context.) !!!!!!!!!!!!!!!!!!!!!!!!
    Where to store css?
*/
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

// import PersonForm from './components/PersonForm.jsx'
// import PersonList from './components/PersonList.jsx'
import { TopNav, LeftNav, MainPart, Table } from './LayoutHelpers.jsx'

export default class App extends React.Component {
  render() {
        return (
            <div>

            <TopNav/>


            <div className="container-fluid">
                <div className="row">

            <LeftNav/>

            <MainPart/>

            <h2>Forms</h2>

            {/*<PersonForm/>*/}

            {/*<PersonList/>*/}

            <div className="table-responsive">
                <Table/>
            </div>

           </div>
            </div>
        </div>

        );
  }
}
