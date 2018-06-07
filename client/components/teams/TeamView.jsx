import React from "react"
import { Link } from 'react-router-dom'


import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"

import { fetchModel, fetchModelAll, fetchPersonsInTeam } from "../common/models"


class TeamView extends React.Component {

  constructor(props) {
    super(props);
    let team_id = parseInt(this.props.match.params.id)
    this.state = {
      team_id:team_id,
      teams: fetchModelAll('teams'),
      team_name: fetchModel('teams', team_id).name,
      persons_in_team: fetchPersonsInTeam(team_id)
    }
  }

  render() {
    return (
      <div>
        <h2>{ this.state.team_name }</h2>
        <DragAndDropTable>
        {
          this.state.persons_in_team.map((r) => {
            return <Row key={r.id} id={r.id}>
                 <th><Link to={{ pathname: '/person/' + r.id }}>{r.name}</Link></th>
            </Row>
          })
        }
        </DragAndDropTable>
    </div>
    )
  }

}


export default TeamView
