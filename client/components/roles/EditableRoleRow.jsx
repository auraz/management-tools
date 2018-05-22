import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditableTeamRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      role_id: this.props.role_id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    return  [
      { id: this.state.role_id, name: name },
      "UPDATE_ROLE_NAME"
    ]
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableTeamRow
