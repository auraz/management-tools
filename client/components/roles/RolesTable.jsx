import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableParamRow from "../common/EditableParamRow.jsx";


class RolesTable extends React.Component {

  render() {
    return <DragAndDropTable>
      {
         this.props.roles.map((r) => {
          return <Row key={r.id} id={r.id}>
            <th>{r.name}</th>
            <td>
              <EditableParamRow value={""} model="roles" id={r.id} formMode="textInput" action={() => {this.setState()}} />
            </td>
          </Row>
        })
      }
    </DragAndDropTable>
  }

}

const mapStateToProps = (state) => {
    return { roles: state.roles }
}

export default connect(mapStateToProps)(RolesTable)
