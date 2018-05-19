import { connect } from 'react-redux'
import React from "react"


import Row from "../common/Row.jsx"
import EditableRow from "../common/EditableRow.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"

import { get_person_name_by_id } from "../common/db_helpers.jsx"


class TeamView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      team_id: this.props.match.params.id,
    }
  }

  filter_by_team(rows) {
    return rows.filter(row => row.team_id == this.state.team_id)
  }

  render() {
    return (
      <div>
      <h2>{ this.props.teams.find(el => el.id == this.state.team_id).name }</h2>
      <DragAndDropTable>
      {
      this.filter_by_team(this.props.rows).map((r) => {
        return <Row key={r.id} id={r.id}>
             <th>{r.name}</th>
          <td><EditableRow value={r.value} /></td>
        </Row>
      })
    }
    </DragAndDropTable>
    </div>
  )
  }

}

const mapStateToProps = (state) => {
    return {
      teams: state.teams,
      rows: state.persons_teams.map((key) =>  ({
        id: key.id,
        team_id: key.team_id,
        name: get_person_name_by_id(state, key.person_id),
        value: ""
      }))
    }
}

export default connect(mapStateToProps)(TeamView)

