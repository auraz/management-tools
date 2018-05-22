import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"

import EditablSkillRow from "./EditableSkillRow.jsx"


class SkillsTable extends React.Component {

  render() {
    return <DragAndDropTable>
    {
      this.props.rows.map((r) => {
        return <Row key={r.id} id={r.id}>
          <th>{r.name}</th>
          <td>
            <EditablSkillRow value={""} {...this.props} skill_id={r.id} formMode="textInput" />
          </td>
        </Row>
      })
    }
    </DragAndDropTable>
  }

}

const mapStateToProps = (state) => {
   return { rows: state.skills.map((key) =>  ({id: key.id, name: key.name, value: ""}))}
}

export default connect(mapStateToProps)(SkillsTable)
