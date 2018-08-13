import { connect } from 'react-redux'
import React from "react"
import _ from 'lodash'

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx";


class SkillsTable extends React.Component {

  deleteControl(id) {
    return <div tabIndex="-1">
       <small>
        <a href="#" onClick={(t) => this.props.deleteSkill(id)}><i className="fas fa-times-circle"></i></a>
        </small>
      </div>
  }

  componentWillMount() {
    this.props.fetchSkills();
  }


  render() {
    if (!this.props.skills) {
      return <div>Loading...</div>
    }
    return <DragAndDropTable>
    {this.props.skills.map(skill => {
        return <Row key={skill.id} id={skill.id}>
          <th>{skill.name}</th>
          <th>
            <EditableRow action={_.partial(this.props.renameSkill, skill.id)} formMode="textInput" />
          </th>
          <th>
            { this.deleteControl(skill.id) }
          </th>
        </Row>
      })
    }
    </DragAndDropTable>
  }

}

const mapStateToProps = state => {
  return { skills: state.SkillsReducer.skills };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSkills: () => dispatch({type: "FETCH_SKILLS"}),
    renameSkill: (id, newName) => dispatch({type: "RENAME_SKILL", payload: {id: id, name: newName}}),
    deleteSkill: (id) => dispatch({type: "DELETE_SKILL", skill_id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsTable)
