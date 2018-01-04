/*
    Render list of roles and for to add new role.
*/
import React from 'react';
import { connect } from 'react-redux'

class Roles_ extends React.PureComponent {
    toRender() {
        return this.props.roles.map((role, indx) => <li key={indx}>{role}</li>);
    }

    render() {
        return <ul className="col-8">{this.toRender()}</ul>
    }
}

const mapStateToProps = (state) => {
    return { roles: state.roles}
}

const Roles = connect(mapStateToProps)(Roles_)

export default Roles
