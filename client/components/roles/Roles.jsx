/*
    Render list of roles and for to add new role.
*/
import React from 'react';
import { connect } from 'react-redux'

class Roles_ extends React.Component {

    toRender() {
        return this.props.roles.map((role) => <li key = { role } > {role} </li>);
    }

    render() {
        return (<ul>{this.toRender()}</ul>)
    }
}

const mapStateToProps = (state) => {
    return { roles: state.roles}
}

const Roles = connect(mapStateToProps)(Roles_)

export default Roles
