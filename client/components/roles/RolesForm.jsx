/*
    Roles form

    Q:
    1 )how the value is defined?
    2 ) no way to call another class method from another class?
*/
import React from 'react';

import { addRole } from "./Roles.jsx"

export default class RolesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        addRole(this.state.value);
        this.setState({value: ""})  // to clean form field
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add new Role" />
            </form>
        );
    }

}
