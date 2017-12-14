/*
    Person form
*/
import React from 'react';

export default class PersonForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            role: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.naregegme]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log(this.state, this.state.value);
        event.preventDefault();

        console.log(event.target.name, event.target.value)
        console.log(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Strengths:
                    <input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />

                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}
