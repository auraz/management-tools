import { connect } from 'react-redux'
import React from "react"
import EditableRow from "../common/EditableRow.jsx";

class EditablePersonRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      person_id: this.props.person_id,
    }
    this.customSave = this.customSave.bind(this);
  }

  customSave(new_name) {
    return  [
      { person_id: this.state.person_id, person_name: new_name },
      "UPDATE_PERSON_NAME"
    ]
  }

  render() {
    return <EditableRow  {...this.props} value={this.props.value} customSave={this.customSave} formMode={this.props.formMode} />
  }

}

export default EditablePersonRow
