import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import DeleteControl from "../common/DeleteControl.jsx";


class TeamRoles extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isCollapsed: 'show' };
  }

  deleteControl(role_id) {
    return <div tabIndex="-1">
      <small>
        <a href="#" onClick={(t) => this.props.deleteTeamRole(role_id, this.props.team_id)}>
          <i className="fas fa-times-circle"></i>
        </a>
      </small>
      </div>
  }


  listTeamRoles() {
    return (
      <div className="card card-body">
        <ul className="list-group list-group-flush">
          {this.props.roles.map(
            r => <li className="list-group-item" key={r.id}>{r.name}{ this.deleteControl(r.id) }</li>
          )}
        </ul>
      </div>
    )
  }

  // Add role that is not in team, to team
  selectRoles() {
    return (
      <Select name="form-field-name" value={''}
        onChange={(target) => {
          this.setState({isCollapsed: 'show'});
          this.props.addTeamRole(target, this.props.team_id)}
        }
        options={ _.differenceBy(this.props.allRoles, this.props.roles, 'id').map(
          role => ({value: role.id, label: role.name})
        )}
      />
    )
  }

  render() {
    return (
    <div>
      <a data-toggle="collapse" href={`#collapseRoles_${this.props.team_id}`} role="button">Team roles</a>
      <div className={`collapse ${this.state.isCollapsed}`} id={"collapseRoles_" + this.props.team_id} >
        { this.listTeamRoles() }
        { this.selectRoles() }
      </div>
    </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    addTeamRole: (target, team_id) => {
        dispatch({payload: { role_id: target.value, team_id: parseInt(team_id) }, type: "ADD_TEAM_ROLE"})
    },
    deleteTeamRole: (role_id, team_id) => dispatch({type: "DELETE_TEAM_ROLE", role_id: role_id, team_id: team_id}),
  }
}

const mapStateToProps = (state) => {
  return { allRoles: state.appReducer.allRoles }
}


export default connect(mapStateToProps, mapDispatchToProps)(TeamRoles)

