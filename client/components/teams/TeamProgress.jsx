import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import  * as models from  "../common/models"

import Select from 'react-select';
import 'react-select/dist/react-select.css';


class TeamProgress extends React.Component {

  divStyle(team_id) {
    return { width: "50%"}
    // return { width: team_health(this.state.persons_teams, this.props.persons_skills, team_id) }
  }

  render() {
    return (
      <div className="progress">
          <div className="progress-bar bg-success" style={this.divStyle(r.id)}></div>
      </div>
    )
  }

}

export default TeamProgress
