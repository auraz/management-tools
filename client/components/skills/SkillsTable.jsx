import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx";
import DeleteControl from "../common/DeleteControl.jsx";

import { fetchModelAll, fetchPersonsInTeam } from "../common/models"


class SkillsTable extends React.Component {

  render() {
    return <DragAndDropTable>
    {
      this.props.skills.map((r) => {
        return <Row key={r.id} id={r.id}>
          <th>{r.name}</th>
          <th>
            <EditableRow value="" id={r.id} model="skills" formMode="textInput" />
          </th>
          <th>
            <DeleteControl id={r.id} model="skills" /> {/* Should be cascade deletion */}
          </th>
        </Row>
      })
    }
    </DragAndDropTable>
  }

}

const mapStateToProps = (state) => {
   return { state: state, skills: state.skills }
}

export default connect(mapStateToProps)(SkillsTable)
