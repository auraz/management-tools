import DragAndDropTable from "../common/DragAndDropTable.jsx"
import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import EditableRow from "../common/EditableRow.jsx"



class TeamsTable extends React.Component {

    componentWillMount() {
        this.setState({rows: this.props.rows})
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


const mapStateToProps = (state) => {
    return { rows:state.teams.map((key, idx) =>  ({id: idx, name: key, value: ""}))}
}

export default connect(mapStateToProps)(TeamsTable)
