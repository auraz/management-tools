import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditableSkillRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      skill_id: this.props.skill_id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    return  [
      { id: this.state.skill_id, name: name },
      "UPDATE_SKILL_NAME"
    ]
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableSkillRow
