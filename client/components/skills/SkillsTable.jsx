import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import EditableRow from "../common/EditableRow.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"


class SkillsTable extends React.Component {

  componentWillMount() {
    this.setState(
      {rows: [
        {id: 1, name: "Javascript", value: 9},
        {id: 2, name: "Python", value: 7},
        {id: 3, name: "Django", value: 7},
        {id: 4, name: "React", value: 7},
        {id: 5, name: "Redux", value: 5},
        {id: 6, name: "Php", value: 3},
      ]}
    )
  }

  render() {
    return <DragAndDropTable>
    {
      this.state.rows.map((r) => {
        return <Row key={r.id} id={r.id}>
          <th>{r.name}</th>
          <td><EditableRow value={r.value} /></td>
        </Row>
      })
    }
    </DragAndDropTable>
  }


}

export default SkillsTable
