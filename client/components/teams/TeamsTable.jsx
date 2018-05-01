import BaseTable from "../common/BaseTable.jsx"
import { connect } from 'react-redux'

class TeamsTable extends BaseTable{

componentWillMount() {
        this.setState({rows: this.props.rows})
    }
}

const mapStateToProps = (state) => {
    return { rows:state.teams.map((key, idx) =>  ({id: idx, name: key, value: ""}))}
}

export default connect(mapStateToProps)(TeamsTable)
