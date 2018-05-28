import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditableParamRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      param_id: this.props.param_id,
      person_id: this.props.person_id,
      param_table: this.props.param_table
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(name) {
    return  [
      { param_id: this.state.param_id, name: name, param_table: this.state.param_table, person_id: this.state.person_id },
      "ADD_PARAMETER_TO_PERSON"
    ]
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditableParamRow
