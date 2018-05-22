import React from "react"
import { connect } from 'react-redux'
import { addX } from './action.jsx'

class EditableRow_ extends React.Component{
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
        this.props.handleSaveRow(...this.props.customSave(parseInt(this.state.draft)));
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
                    {["Good", "Need Improve"].map((i, idx) => <option value={idx+1} key={i}>{i}</option>)}
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleSaveRow: (payload, action) => {
            dispatch(addX(payload, action))
        }
    }
}

const EditableRow = connect(null, mapDispatchToProps)(EditableRow_)

export default EditableRow



