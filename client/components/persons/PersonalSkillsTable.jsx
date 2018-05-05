import BaseTable from "../common/BaseTable.jsx"
import { connect } from 'react-redux'

class PersonalSkillsTable extends BaseTable{
    componentWillMount() {
        this.setState({rows: this.props.rows})
    }
}

const mapStateToProps = (state) => {
    let processed = state.persons.Koval.map(function(skill, idx) {
            console.log(skill, skill[0], skill[1]);
            return {id: idx, name: skill[0], value: skill[1]}
    })
    return { rows: processed }
}

export default connect(mapStateToProps)(PersonalSkillsTable)
