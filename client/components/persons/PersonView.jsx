import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import { get_skill_name_by_id, get_level_name_by_id, get_param_name_by_id } from "../common/db_helpers.jsx"

import EditablePersonSkillsRow from "./EditablePersonSkillsRow.jsx"
import EditableParamRow from "./EditableParamRow.jsx"


class PersonView extends React.Component {

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
          <tr><th>Strenth</th><th>Weakness</th></tr>
          <tr><td>
            <DragAndDropTable>
            {
            this.filter_by_person(this.props.strength_rows).map((r) => {
              return <Row key={r.id} id={r.id}>
                   <th>{r.param_name}</th>
                <td><EditableParamRow value={r.level} {...this.props} person_id={r.person_id} param_id={r.param_id} param_tabl="strengths" /></td>
              </Row>
            })
            }
          </DragAndDropTable>
          </td>
          <td>
            <DragAndDropTable>
            {
            this.filter_by_person(this.props.weakness_rows).map((r) => {
              return <Row key={r.id} id={r.id}>
                   <th>{r.param_name}</th>
                <td><EditableParamRow value={r.level} {...this.props} person_id={r.person_id} param_id={r.param_id} param_tabl="weaknesses" /></td>
              </Row>
            })
          }
          </DragAndDropTable>
          </td></tr>
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
      }))
    }
}

export default connect(mapStateToProps)(PersonView)

