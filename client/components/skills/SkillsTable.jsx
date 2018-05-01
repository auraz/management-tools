import React from "react"
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import Row from "./Row.jsx"

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
                    {[0,1,2,3,4,5,6,7,8,9].map((i) => <option value={i} key={i}>{i}</option>)}
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


class SkillsTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {rows: [
            {id: 1, name: "Javascript", value: 9},
            {id: 2, name: "Python", value: 7},
            {id: 3, name: "Django", value: 7},
            {id: 4, name: "React", value: 7},
            {id: 5, name: "Redux", value: 5},
            {id: 6, name: "Php", value: 3},
        ]};
        this.moveRow = this.moveRow.bind(this);
    }

    moveRow(id, afterId) {
        let rows = this.state.rows.concat([])
        let currentRow = rows.filter((r) => r.id === id)[0];
        let afterRow = rows.filter((r) => r.id === afterId)[0];
        let currentRowIndex = rows.indexOf(currentRow);
        let afterRowIndex = rows.indexOf(afterRow);
        // remove the current row
        rows.splice(currentRowIndex, 1);
        // put it after
        rows.splice(afterRowIndex, 0, currentRow);
        this.setState({rows: rows});
    }

    render() {
        let rows = this.state.rows.map((r) => {
            return <Row key={r.id} id={r.id} moveRow={this.moveRow}>
                <th>{r.name}</th><td><EditableRow value={r.value} /></td>
            </Row>
        });
        return (
            <table className="table table-striped">
                <tbody>{rows}</tbody>
            </table>
        );
    }
}


export default DragDropContext(HTML5Backend)(SkillsTable)
