import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import DeleteControl from "../common/DeleteControl.jsx";
import  * as models from  "../common/models"

import Select from 'react-select';
import 'react-select/dist/react-select.css';


class TeamView extends React.Component {

  constructor(props) {
    super(props);
    let team_id = parseInt(this.props.match.params.id)
    this.state = {
      team_id:team_id,
      teams: models.fetchModelAll('teams'),
      team_name: models.fetchModel('teams', team_id).name,
    }
  }

   listRoles(team_id) {
    return models.fetchTeamsRoles(team_id).map((r) => <li className="list-group-item" key={r.id}>{r.name}</li>)
  }



  render() {
    return (
      <div>
        <h2>{ this.state.team_name }</h2>
        <DragAndDropTable>
        {
          models.fetchPersonsInTeam(this.state.team_id).map((r) => {
            return <Row key={r.id} id={r.id}>
                 <th><Link to={{ pathname: '/person/' + r.id }}>{r.name}</Link></th>
                 <th>
                  <div className="card card-body">
                    <ul className="list-group list-group-flush">
                     { this.listRoles(this.state.team_id) }
                    </ul>
                  </div>
                  </th>

            </Row>
          })
        }
        </DragAndDropTable>
        <Select name="form-field-name" value={''}
          onChange={(target) => this.props.addPersonTeam(target, this.state.team_id)}
          options={ models.fetchModelAll('persons').filter(
              (y) => !models.fetchPersonsInTeam(this.state.team_id).map(t => t.id).includes(y.id)
            ).map(
              (t) => ({ value: t.id, label: t.name })
            )
          }
      />
    </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { fake_update: state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPersonTeam: (target, team_id) => {
            dispatch({payload: { person_id: target.value, team_id: parseInt(team_id) }, type: "ADD_PERSON_TEAM"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamView)
