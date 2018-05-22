import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditableRoleRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      team_id: this.props.team_id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    return  [
      { id: this.state.team_id, name: name },
      "UPDATE_TEAM_NAME"
    ]
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableRoleRow
