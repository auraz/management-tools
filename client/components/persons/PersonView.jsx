import { connect } from 'react-redux'
import React from "react"
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx"
import  * as models from  "../common/models"

import EditablePersonSkillsRow from "./EditablePersonSkillsRow.jsx"



class PersonView extends React.Component {

  progress(person_id) {
    // return { width: Math.floor(person_health(this.props.persons_skills, person_id) * 100).toFixed(0) + "%" }
    return (
      <div className="person-progress">Progress
        <div className="progress">
          <div className="progress-bar bg-success" style={{ width: "50%" }}>
          </div>
        </div>
      </div>
    )
  }

  paramsTable(param_type) {
    return (
      <div>
        <DragAndDropTable>
        {
        models.fetchPersonParam(param_type, this.state.person_id).map((r) => {
          return <Row key={r.id} id={r.id}>
            <th>{r.name}</th>
            <td>
             <EditableRow value="" id={r.id} model="params" formMode="textInput" />
            </td>
          </Row>
        })
        }
        </DragAndDropTable>
        <h3> Attach param </h3>
        <Select name="form-field-name" value={''}
            onChange={(target) => this.props.addPersonParam(param_type, target, this.state.person_id)}
            options={models.fetchModelAll("params").filter(
                (r) => !models.fetchPersonParam(param_type, this.state.person_id).map(p => p.id).includes(r.id)
              ).map(
              (r) => ({ value: r.id, label: r.name })
            )}
        />
      </div>
      )
    }

  constructor(props) {
    super(props);
    this.state = {
      person_id: this.props.match.params.id,
    }
  }

  render() {
    return (
      <div>
      <h2>{ models.fetchModel('persons', this.state.person_id).name }</h2>
      <table>
        <tbody>
          <tr>
            <th>Strenth</th><th>Weakness</th><th>{ this.progress(this.state.person_id) }</th>
          </tr>
          <tr>
            <td>{ this.paramsTable("strengths") } </td>
            <td>{ this.paramsTable("weaknesses") }</td>
          </tr>
        </tbody>
      </table>
      <h3>Skills</h3>
      <DragAndDropTable>
      {
      models.fetchPersonSkills(this.state.person_id).map((r) => {
        return <Row key={r.skill_id} id={r.skill_id}>
             <th>{r.skill_name}</th>
          <td><EditablePersonSkillsRow value={r.level_name} {...this.props} person_id={r.person_id} skill_id={r.skill_id} /></td>
        </Row>
      })
    }
    </DragAndDropTable>
    <h3> Attach skill </h3>
    <Select name="form-field-name" value={''}
        onChange={(target) => this.props.addPersonSkill(target, this.state.person_id)}
        options={models.fetchModelAll('skills').filter(
            (r) => !models.fetchPersonSkills(this.state.person_id).map(s => s.skill_id).includes(r.id)
          ).map(
          (r) => ({ value: r.id, label: r.name })
        )}
    />

    </div>
  )
  }

}

const mapStateToProps = (state) => {
  return { fake_update: state } // This is pretty cool trick, we do not use this, but it is updated
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPersonSkill: (target, person_id) => {
            dispatch({payload: { skill_id: target.value, person_id: parseInt(person_id) }, type: "ADD_SKILL_PERSON"})
        },
        addPersonParam: (param_type, target, person_id) => {
          dispatch({payload: { param_model: param_type, param_id: target.value, person_id: parseInt(person_id) }, type: "ADD_PARAM_PERSON"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonView)

