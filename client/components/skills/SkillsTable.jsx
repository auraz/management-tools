import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableParamRow from "../common/EditableParamRow.jsx";

import { fetchModelAll, fetchPersonsInTeam } from "../common/models"


class SkillsTable extends React.Component {

  render() {
    return <DragAndDropTable>
    {
      this.props.skills.map((r) => {
        return <Row key={r.id} id={r.id}>
          <th>{r.name}</th>
          <td>
            <EditableParamRow value={""} id={r.id} models="skills" formMode="textInput" action={() => {this.setState()}}/>
          </td>
        </Row>
      })
    }
    </DragAndDropTable>
  }

}

const mapStateToProps = (state) => {
   return { skills: state.skills }
}

export default connect(mapStateToProps)(SkillsTable)
