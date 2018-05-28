import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import { team_health } from "../common/db_helpers"
import { fetchTeams, fetchPersonsInTeam } from "../common/dbActions"

import EditableTeamRow from "./EditableTeamRow.jsx";


class TeamsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // team_id: this.props.match.params.id,
      teams: fetchTeams(),
      // team_name: fetchTeam(this.state.team_id).name,
      // persons_in_team: fetchPersonsInTeam(this.state.team_id)
    }
  }

  divStyle(team_id) {
    return { width: "50%"}
    // return { width: team_health(this.state.persons_teams, this.props.persons_skills, team_id) }
  }

  listRoles(team_id) {
    return this.props.persons_teams.map((e, i) => <li className="list-group-item" key={i}>{e.id}</li>)
  }

  render() {
    return (
      <DragAndDropTable>
        {this.state.teams.map( r => {
          return (
            <Row key={r.id} id={r.id}>
              <th>
                <Link to={{ pathname: "/team/" + r.id }}>{ r.name }</Link>
                <EditableTeamRow value={""} team_id={r.id} formMode="textInput" action={ () => {this.setState() } } />
              </th>
              <td>
                <div className="progress">
                    <div className="progress-bar bg-success" style={this.divStyle(r.id)}></div>
                </div>
                <a className="" data-toggle="collapse" href="#collapseRoles" role="button" aria-expanded="false" aria-controls="collapseRoles">Team roles
                </a>
                <div className="collapse" id="collapseRoles">
                  <div className="card card-body">
                    <ul className="list-group list-group-flush">
                      {/*{ this.listRoles(r.id) }*/}
                    </ul>
                  </div>
                </div>
                </td>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}


export default TeamsTable;
