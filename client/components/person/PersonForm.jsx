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

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Strengths:
                    <input type="text" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}
