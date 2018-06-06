import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx";


class ParamTable extends React.Component {

  render() {
    return <DragAndDropTable>
      {
         this.props.params.map((r) => {
          return <Row key={r.id} id={r.id}>
            <th>{r.name}</th>
            <td>
              <EditableRow value="" model="params" id={r.id} formMode="textInput" />
            </td>
          </Row>
        })
      }
    </DragAndDropTable>
  }

}

const mapStateToProps = (state) => {
    return { params: state.params }
}

export default connect(mapStateToProps)(ParamTable)
