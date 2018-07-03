import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import EditableRow from "../common/EditableRow.jsx";


import TeamRoles from './TeamRoles.jsx'


class TeamsTable extends React.Component {

  deleteControl(team_id) {
    return <div tabIndex="-1">
       <small>
        <a href="#" onClick={(t) => this.props.deleteTeam(team_id: team_id)}><i className="fas fa-times-circle"></i></a>
        </small>
      </div>
  }


  componentWillMount() {
    this.props.fetchTeamsRoles()
  }

  render() {
    if (!this.props.TeamsRoles) {
      return <div>Loading...</div>
    }
    return (
      <DragAndDropTable>
        {this.props.TeamsRoles.map( team => {
          return (
            <Row key={team.id} id={team.id}>
              <th>
                <Link to={{ pathname: "/team/" + team.id }}>{ team.name }</Link>
              </th>
              <th>
                <EditableRow  id={team.id} model="teams" value="" formMode="textInput" />
              </th>
              <th>
                { this.deleteControl(team.id) }
              </th>
              <th>
                  {/*<TeamProgress team={team.id}/>*/}
                  <TeamRoles roles={team.roles} team_id={team.id}/>
                </th>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = (state) => {
  return { TeamsRoles: state.TeamReducer.TeamsRoles }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeamsRoles: () => dispatch({type: "FETCH_TEAMS_ROLES"}),
    deleteTeam: (team_id) => dispatch({type: "DELETE_TEAM", team_id: team_id}),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable)
