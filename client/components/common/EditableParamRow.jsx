import React from "react"
import EditableRow from "./EditableRow.jsx";
import { updateModelName } from "./models"


class EditableTeamRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    updateModelName(this.props.model, this.state.id, name)
    this.props.action()
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableTeamRow
