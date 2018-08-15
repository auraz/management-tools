import React from "react";

import RolesTable from './RolesTable.jsx'
import RoleForm from './RoleForm.jsx'


class Roles extends React.Component {

  render() {
    return (
      <div>
        <h2>Roles</h2>
        <RolesTable/>
        <br/>
        <RoleForm />
      </div>
    )
  }

}

export default Roles
