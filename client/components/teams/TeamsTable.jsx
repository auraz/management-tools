import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import _ from 'lodash'

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import EditableRow from "../common/EditableRow.jsx";


import TeamRoles from './TeamRoles.jsx'


class TeamsTable extends React.Component {

  deleteControl(id) {
    return <div tabIndex="-1">
       <small>
        <a href="#" onClick={(t) => this.props.deleteTeam(id)}><i className="fas fa-times-circle"></i></a>
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
        {this.props.TeamsRoles.map(team => {
          return (
            <Row key={team.id} id={team.id}>
              <th>
                <Link to={{ pathname: "/team/" + team.id }}>{ team.name }</Link>
              </th>
              <th>
                <EditableRow action={_.partial(this.props.renameTeam, team.id)} formMode="textInput" />
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
    renameTeam: (id, newName) => dispatch({type: "RENAME_TEAM", payload: {id: id, name: newName}}),
    deleteTeam: (id) => dispatch({type: "DELETE_TEAM", team_id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable)
