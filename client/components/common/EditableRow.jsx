import React from "react";


class EditableRow_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      draft: null,
      editMode: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSave(event) {
    this.setState({
      value: this.state.draft,
      draft: null,
      editMode: false
    });

    this.props.action(this.state.draft)
    event.preventDefault();
  }

  handleCancel(event) {
    this.setState({
      draft: null,
      editMode: false
    });
    event.preventDefault();
  }

  handleEdit(event) {
    this.setState({ editMode: true });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ draft: event.target.value });
    event.preventDefault();
  }

  renderInput() {
    if (this.props.formMode === undefined) {
      return (
        <select
          type="number"
          value={this.state.draft || this.state.value}
          onChange={this.handleChange}
        >
          {["Good", "Need Improve"].map((i, idx) => (
            <option value={idx + 1} key={i}>
              {i}
            </option>
          ))}
        </select>
      )
    }
    if (this.props.formMode === "textInput") {
      return <input type="text" value={this.state.draft || this.state.value} onChange={this.handleChange} />;
    }
  }

  render() {
    if (this.state.editMode) {
      return (
        <div tabIndex="-1">
          {this.renderInput()}&nbsp;
          <small>
            <a href="#" onClick={this.handleSave}>
              <i className="fas fa-save"></i>
            </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" onClick={this.handleCancel}>
              <i className="fas fa-times-circle"></i>
            </a>
          </small>
        </div>
      );
    }

    return (
      <div>
        {this.state.value}&nbsp;<small>
          <a href="#" onClick={this.handleEdit}>
            <i className="far fa-edit"></i>
          </a>
        </small>
      </div>
    );
  }
}


export default EditableRow_;
