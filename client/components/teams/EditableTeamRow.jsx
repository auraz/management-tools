import React from "react"
import EditableRow from "../common/EditableRow.jsx";

import { updateModelName } from "../common/dbActions.jsx"

class EditableRoleRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      team_id: this.props.team_id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    udpateModelName('teams',  { id: this.state.team_id, name: name })
    this.props.action()
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableRoleRow
