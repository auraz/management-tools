import React from "react";

import PersonsTable from './PersonsTable.jsx'
import PersonForm from './PersonForm.jsx'


class Persons extends React.Component {

  render() {
    return (
      <div>
        <h2>Persons</h2>
        <PersonsTable/>
        <br/>
        <PersonForm />
      </div>
    )
  }

}

export default Persons
