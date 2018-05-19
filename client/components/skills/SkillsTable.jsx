import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import EditableRow from "../common/EditableRow.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"


class SkillsTable extends React.Component {

  render() {
    return <DragAndDropTable>
    {
      this.props.rows.map((r) => {
        return <Row key={r.id} id={r.id}>
          <th>{r.name}</th>
          <td><EditableRow value={r.value} /></td>
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
