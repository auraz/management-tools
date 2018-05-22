import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditableParamRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      param_id: this.props.param_id,
      param_table: this.props.param_table
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    return  [
      { id: this.state.param_id, name: name, param_table: this.state.param_table },
      "UPDATE_PARAMETER_NAME"
    ]
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableParamRow
