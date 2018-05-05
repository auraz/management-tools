import React from "react"

class EditableRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            draft: null,
            editMode: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSave(event) {
        this.setState({
            value: this.state.draft,
            draft: null,
            editMode: false,
        });
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
        this.setState({editMode: true});
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({draft: event.target.value});
        event.preventDefault();
    }

    render() {
        if (this.state.editMode) {
            return <div tabIndex="-1">
                <select type="number" value={this.state.draft || this.state.value} onChange={this.handleChange}>
                    {["Enough", "Not Enough"].map((i) => <option value={i} key={i}>{i}</option>)}
                </select>&nbsp;
                <small>
                    <a href="#" onClick={this.handleSave}>Save</a>&nbsp;
                    <a href="#" onClick={this.handleCancel}>Cancel</a>
                </small>
            </div>
        }

        return <div>{this.state.value}&nbsp;<small><a href="#" onClick={this.handleEdit}>Edit</a></small></div>
    }
}

export default EditableRow
