import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import DeleteControl from "../common/DeleteControl.jsx";


class TeamRoles extends React.Component {

  listTeamRoles() {
    return this.props.roles.map((r) => <li className="list-group-item" key={r.id}>{r.name}<DeleteControl id={r.id} model="teams_roles" /></li>)
  }

  render() {
    return (
    <div>
      <a data-toggle="collapse" href={"#collapseRoles_" + this.props.team_id} role="button">Team roles</a>
      <div className="collapse" id={"collapseRoles_" + this.props.team_id} >
        <div className="card card-body">
          <ul className="list-group list-group-flush">
            { this.listTeamRoles() }
          </ul>
      </div>
      <Select name="form-field-name" value={''}
        onChange={(target) => this.props.addTeamRole(target, this.props.team_id)}
        options={ this.props.allRoles.filter(
          (y) => !this.props.roles.map(role => role.id).includes(y.id)
        ).map(
          (t) => ({ value: t.id, label: t.name })
        )
      }
      />
      </div>
    </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addTeamRole: (target, team_id) => {
            dispatch({payload: { role_id: target.value, team_id: parseInt(team_id) }, type: "ADD_TEAM_ROLE"})
        }
    }
}

const mapStateToProps = (state) => {
  return { allRoles: state.appReducer.allRoles }
}


export default connect(mapStateToProps, mapDispatchToProps)(TeamRoles)

