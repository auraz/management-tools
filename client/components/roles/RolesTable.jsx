import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import EditableRow from "../common/EditableRow.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"


class RolesTable extends React.Component {

  componentWillMount() {
    this.setState({rows: this.props.rows})
  }

  render() {
    { console.log(this.state) }
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

const mapStateToProps = (state) => {
    return { rows:state.roles.map((role, idx) =>  ({id: idx, name: role, value: ""}))}
}

export default connect(mapStateToProps)(RolesTable)
