import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import { team_health } from "../common/db_helpers"

import EditableTeamRow from "./EditableTeamRow.jsx";


class TeamsTable extends React.Component {

  divStyle(team_id) {
    return { width: team_health(this.props.persons_teams, this.props.persons_skills, team_id) }
  }

  render() {
    return (
      <DragAndDropTable>
        {this.props.rows.map(r => {
          return (
            <Row key={r.id} id={r.id}>
              <th>
                <Link to={{ pathname: "/team/" + r.id }}>
                { r.name  }
                </Link>
              </th>
              <td>
                <EditableTeamRow value={""} {...this.props} team_id={r.id} formMode="textInput" />
              </td>
              <td>
                <div className="progress">
                    <div className="progress-bar bg-success" style={this.divStyle(r.id)}></div>
                </div>
              </td>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = state => {
  return {
    rows: state.teams.map(key => ({ id: key.id, name: key.name, value: "" })),
    persons_skills: state.persons_skills,
    persons_teams: state.persons_teams
  };
};

export default connect(mapStateToProps)(TeamsTable);
