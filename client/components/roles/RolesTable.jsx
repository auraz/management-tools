import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"

import EditableRoleRow from "./EditableRoleRow.jsx"


class RolesTable extends React.Component {

  render() {
    return <DragAndDropTable>
      {
         this.props.rows.map((r) => {
          return <Row key={r.id} id={r.id}>
            <th>{r.name}</th>
            <td>
              <EditableRoleRow value={""} {...this.props} role_id={r.id} formMode="textInput" />
            </td>
          </Row>
        })
      }
    </DragAndDropTable>
  }

}

const mapStateToProps = (state) => {
    return { rows: state.roles.map((key) =>  ({id: key.id, name: key.name}))}
}

export default connect(mapStateToProps)(RolesTable)
