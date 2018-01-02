/*
    Render list of roles and for to add new role.

    This is rendered on client or on server?
    How deploy with docker?
*/
import React from 'react';
import { connect } from 'react-redux'

class Roles_ extends React.PureComponent {
    toRender() {
        return this.props.roles.map((role, indx) => <li key={indx}>{role}</li>);
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


