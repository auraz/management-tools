import BaseTable from "../common/BaseTable.jsx"
import { connect } from 'react-redux'

class PersonsTable extends BaseTable{
    componentWillMount() {
        this.setState({rows: this.props.rows})
    }
}

const mapStateToProps = (state) => {
    return { rows:Object.keys(state.persons).map((role, idx) =>  ({id: idx, name: role, value: ""}))}
}

export default connect(mapStateToProps)(PersonsTable)
