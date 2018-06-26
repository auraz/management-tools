import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import  * as models from  "../common/models"

import Select from 'react-select';
import 'react-select/dist/react-select.css';


class TeamRoles extends React.Component {

  listRoles(team_id) {
    return this.state.teams_roles.map((r) => <li className="list-group-item" key={r.id}>{r.name}<DeleteControl id={r.index_id} model="teams_roles" /></li>)
  }

  render() {
    return (
    <div>
      <a className="" data-toggle="collapse" href={"#collapseRoles_" + r.id} role="button" aria-expanded="false" aria-controls="collapseRoles">Team roles</a>
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

export default connect(null, mapDispatchToProps)(TeamRoles)

