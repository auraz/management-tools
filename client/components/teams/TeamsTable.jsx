import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import EditableRow from "../common/EditableRow.jsx";
import DeleteControl from "../common/DeleteControl.jsx";
// import { team_health } from "../common/db_helpers"
import { fetchModelAll, fetchPersonsInTeam, fetchTeamsRoles } from "../common/models"


class TeamsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // team_id: this.props.match.params.id,
      // team_name: fetchTeam(this.state.team_id).name,
      // persons_in_team: fetchPersonsInTeam(this.state.team_id)
      teams: [],
      roles: [],

    }
  }

  divStyle(team_id) {
    return { width: "50%"}
    // return { width: team_health(this.state.persons_teams, this.props.persons_skills, team_id) }
  }

  listRoles(team_id) {
    return this.state.teams_roles.map((r) => <li className="list-group-item" key={r.id}>{r.name}<DeleteControl id={r.index_id} model="teams_roles" /></li>)
  }

  async componentDidMount() {
    let teams = await fetchModelAll('teams');
    let roles = await fetchModelAll('roles');
    let teams_roles = await fetchTeamsRoles(1);
    this.setState({ 'teams': teams, 'roles': roles, 'teams_roles': teams_roles });
    console.log(teams_roles)
  }

  render() {
    if (this.state.teams === []) {
      return <div>Fetching Teams</div>
    }
    return (
      <DragAndDropTable>
        {this.state.teams.map( r => {
          return (
            <Row key={r.id} id={r.id}>
              <th>
                <Link to={{ pathname: "/team/" + r.id }}>{ r.name }</Link>
              </th>
              <th>
                <EditableRow  id={r.id} model="teams" value="" formMode="textInput" />
              </th>
              <th>
                <DeleteControl id={r.id} model="teams" /> {/* Should be cascade deletion */}
              </th>
              <th>
                <div className="progress">
                    <div className="progress-bar bg-success" style={this.divStyle(r.id)}></div>
                </div>
                <a className="" data-toggle="collapse" href={"#collapseRoles_" + r.id} role="button" aria-expanded="false" aria-controls="collapseRoles">Team roles
                </a>
                <div className="collapse" id={"collapseRoles_" + r.id} >
                  <div className="card card-body">
                    <ul className="list-group list-group-flush">
                     { this.listRoles(r.id) }
                    </ul>
                  </div>
                  <Select name="form-field-name" value={''}
                    onChange={(target) => this.props.addTeamRole(target, r.id)}
                    options={ this.state.roles.filter(
                        (y) => !this.state.teams_roles.map(t => t.id).includes(y.id)
                      ).map(
                        (t) => ({ value: t.id, label: t.name })
                      )
                    }
                    />
                </div>
                </th>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { fake_update: state, teams: state.teams }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        addTeamRole: (target, team_id) => {
            dispatch({payload: { role_id: target.value, team_id: parseInt(team_id) }, type: "ADD_TEAM_ROLE"})
        }
    }
}

export default connect(null, mapDispatchToProps)(TeamsTable)
