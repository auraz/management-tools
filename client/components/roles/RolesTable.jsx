import DragAndDropTable from "../common/DragAndDropTable.jsx"
import { connect } from 'react-redux'

class RolesTable extends DragAndDropTable{

componentWillMount() {
        this.setState({rows: this.props.rows})
    }
}

const mapStateToProps = (state) => {
    return { rows:state.roles.map((role, idx) =>  ({id: idx, name: role, value: ""}))}
}

export default connect(mapStateToProps)(RolesTable)
