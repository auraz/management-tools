import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditablePersonSkillsRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      person_id: this.props.person_id,
      skill_id: this.props.skill_id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(level_id) {
    return  [
      { person_id: this.state.person_id, skill_id: this.state.skill_id, level_id: level_id },
      "UPDATE_SKILL_LEVEL"
    ]
  }


  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} />
  }

}

export default EditablePersonSkillsRow
