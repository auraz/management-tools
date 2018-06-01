import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx"
import { fetchModel, fetchModelAll,fetchPersonParam, fetchPersonSkills } from "../common/models"

import EditablePersonSkillsRow from "./EditablePersonSkillsRow.jsx"
import AddParameterAndAddToPersonForm from "../parameters/AddParameterAndAddToPersonForm.jsx"
import AddSkillAndAddToPersonForm from "../skills/AddSkillAndAddToPersonForm.jsx"


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

  paramsTable(param_model) {
    return (
      <DragAndDropTable>
      {
      fetchPersonParam(param_model, this.state.person_id).map((r) => {
        return <Row key={r.id} id={r.id}>
          <th>{r.name}</th>
          <td>
           <EditableRow value="" id={r.id} model={param_model} formMode="textInput" />
          </td>
        </Row>
      })
      }
      </DragAndDropTable>
      /*            <AddParameterAndAddToPersonForm {...this.props} param_table="strengths" persons_param_table="persons_strengths" person_id={this.state.person_id} />*/
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
      <h2>{ fetchModel('persons', this.state.person_id).name }</h2>
      <table>
        <tbody>
          <tr>
            <th>Strenth</th><th>Weakness</th><th>{ this.progress(this.state.person_id) }</th>
          </tr>
          <tr>
            <td>{ this.paramsTable("strengths") }</td>
            <td>{ this.paramsTable("weaknesses") }</td>
          {/*<AddParameterAndAddToPersonForm {...this.props} param_table="weaknesses" persons_param_table="persons_weaknesses" person_id={this.state.person_id} />*/}
          </tr>
        </tbody>
      </table>
      <h3>Skills</h3>
      <DragAndDropTable>
      {
      fetchPersonSkills(this.state.person_id).map((r) => {
        return <Row key={r.skill_id} id={r.skill_id}>
             <th>{r.skill_name}</th>
          <td><EditablePersonSkillsRow value={r.level_name} {...this.props} person_id={r.person_id} skill_id={r.skill_id} /></td>
        </Row>
      })
    }
    </DragAndDropTable>
    <AddSkillAndAddToPersonForm {...this.props} person_id={this.state.person_id} />
    </div>
  )
  }

}

const mapStateToProps = (state) => {
    return {
      // teams: state.teams,
      // persons: state.persons,
      weaknesses: state.weaknesses,
      strengths: state.strengths // This is pretty cool trick, we do not use this, but it updates and reads from db.
      // skills_rows: state.persons_skills.map((key) =>  ({
      //   id: key.id,
      //   skill_id: key.skill_id,
      //   person_id: key.person_id,
      //   skill_name: get_skill_name_by_id(state, key.skill_id),
      //   level: get_level_name_by_id(state, key.level_id),
      // })),
      // strength_rows: state.persons_strengths.map((key) =>  ({
      //   id: key.id,
      //   param_id: key.param_id,
      //   person_id: key.person_id,
      //   param_name: get_param_name_by_id(state, key.param_id, "strengths"),
      // })),
      // weakness_rows: state.persons_weaknesses.map((key) =>  ({
      //   id: key.id,
      //   param_id: key.param_id,
      //   person_id: key.person_id,
      //   param_name: get_param_name_by_id(state, key.param_id, "weaknesses"),
      // })),
      // persons_skills: state.persons_skills,
    }
}

export default connect(mapStateToProps)(PersonView)

