import React from "react";

import TeamsTable from './TeamsTable.jsx'
import TeamForm from './TeamForm.jsx'


class Teams extends React.Component {

  render() {
    return (
      <div>
        <h2>Teams</h2>
        <TeamsTable/>
        <br/>
        <TeamForm />
      </div>
    )
  }

}

export default Teams

