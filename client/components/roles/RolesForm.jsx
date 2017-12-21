/*
    Roles form

    Q1. this.state.value not works. this.props.value works. Why?
*/
import React from 'react';
import { connect } from 'react-redux'
import { saveRole } from './action.jsx';

class RolesForm_ extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    <input type="text" value={this.props.value} />
                </label>
                <input type="submit" value="Add new Role" />
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (event) => {
            event.preventDefault();
            dispatch(saveRole(event.target[0].value))
        }
    }
}

const RolesForm = connect(null, mapDispatchToProps)(RolesForm_)

export default RolesForm
