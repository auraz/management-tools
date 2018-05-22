import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import { get_skill_name_by_id, get_level_name_by_id } from "../common/db_helpers.jsx"

import EditablePersonSkillsRow from "./EditablePersonSkillsRow.jsx"


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
      <DragAndDropTable>
      {
      this.filter_by_person(this.props.rows).map((r) => {
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
      rows: state.persons_skills.map((key) =>  ({
        id: key.id,
        skill_id: key.skill_id,
        person_id: key.person_id,
        skill_name: get_skill_name_by_id(state, key.skill_id),
        level: get_level_name_by_id(state, key.level_id),
      }))
    }
}

export default connect(mapStateToProps)(PersonView)

