import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
// import { get_skill_name_by_id, get_level_name_by_id, get_param_name_by_id, person_health } from "../common/db_helpers.jsx"

import EditablePersonSkillsRow from "./EditablePersonSkillsRow.jsx"
import EditableParamRow from "../parameters/EditableParamRow.jsx"
import AddParameterAndAddToPersonForm from "../parameters/AddParameterAndAddToPersonForm.jsx"
import AddSkillAndAddToPersonForm from "../skills/AddSkillAndAddToPersonForm.jsx"


class PersonView extends React.Component {

   divStyle(person_id) {
    return { width: Math.floor(person_health(this.props.persons_skills, person_id) * 100).toFixed(0) + "%" }
  }

  constructor(props) {
    super(props);
    this.state = {
      person_id: this.props.match.params.id,
    }
  }

  filter_by_person(rows) {
    return rows.filter(row => row.person_id == this.state.person_id)
  }

  render() {
    return (
      <div>
      <h2>{ this.props.persons.find(el => el.id == this.state.person_id).name }</h2>
      <table>
        <tbody>
          <tr><th>Strenth</th><th>Weakness</th><th>
            <div className="person-progress">
            Progress
            <div className="progress">
             <div className="progress-bar bg-success" style={this.divStyle(this.state.person_id)}></div>
            </div>
            </div>
          </th></tr>
          <tr><td>
            <DragAndDropTable>
            {
            this.filter_by_person(this.props.strength_rows).map((r) => {
              return <Row key={r.id} id={r.id}>
                   <th>{r.param_name}</th>
                <td><EditableParamRow value={r.level} {...this.props} person_id={r.person_id} param_id={r.param_id} param_table="strengths" formMode="textInput"/></td>
              </Row>
            })
            }
          </DragAndDropTable>
          <AddParameterAndAddToPersonForm {...this.props} param_table="strengths" persons_param_table="persons_strengths" person_id={this.state.person_id} />
          </td>
          <td>
            <DragAndDropTable>
            {
            this.filter_by_person(this.props.weakness_rows).map((r) => {
              return <Row key={r.id} id={r.id}>
                   <th>{r.param_name}</th>
                <td><EditableParamRow value={r.level} {...this.props} person_id={r.person_id} param_id={r.param_id} param_table="weaknesses" formMode="textInput"/></td>
              </Row>
            })
          }
          </DragAndDropTable>
          <AddParameterAndAddToPersonForm {...this.props} param_table="weaknesses" persons_param_table="persons_weaknesses" person_id={this.state.person_id} />
          </td>
          <td>
          </td>
          </tr>
        </tbody>
      </table>
      <h3>Skills</h3>
      <DragAndDropTable>
      {
      this.filter_by_person(this.props.skills_rows).map((r) => {
        return <Row key={r.id} id={r.id}>
             <th>{r.skill_name}</th>
          <td><EditablePersonSkillsRow value={r.level} {...this.props} person_id={r.person_id} skill_id={r.skill_id} /></td>
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
      teams: state.teams,
      persons: state.persons,
      skills_rows: state.persons_skills.map((key) =>  ({
        id: key.id,
        skill_id: key.skill_id,
        person_id: key.person_id,
        skill_name: get_skill_name_by_id(state, key.skill_id),
        level: get_level_name_by_id(state, key.level_id),
      })),
      strength_rows: state.persons_strengths.map((key) =>  ({
        id: key.id,
        param_id: key.param_id,
        person_id: key.person_id,
        param_name: get_param_name_by_id(state, key.param_id, "strengths"),
      })),
      weakness_rows: state.persons_weaknesses.map((key) =>  ({
        id: key.id,
        param_id: key.param_id,
        person_id: key.person_id,
        param_name: get_param_name_by_id(state, key.param_id, "weaknesses"),
      })),
      persons_skills: state.persons_skills,
    }
}

export default connect(mapStateToProps)(PersonView)

