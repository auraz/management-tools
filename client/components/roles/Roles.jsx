/*
    Render list of roles and for to add new role.

    Q: 1) How to partially update state and rerender? setState is ugly for this (no partial update).
    Or! model structure maybe too complex for single component?

*/

import React from 'react';


function addRole(role) {
        this.state.roles.push(role);
        localStorage.setItem('roles-state', JSON.stringify(this.state));
        this.setState(JSON.parse(localStorage.getItem('roles-state')))

        // console.log(role, this.state)
    }

export default class Roles extends React.Component {

    constructor(props) {

        super(props)
        addRole = addRole.bind(this);

        this.state = JSON.parse(localStorage.getItem('roles-state')) || {
            roles: [
                "Developer",
                "DevOPS",
                "QA",
                "Architect",
                "Lead",
                "Product Owner",
                "Project Coordinator",
                "Team Coordinator",
            ],

            grades: [
            "Junior",
            "Middle",
            "Senior",
            "Lead",
            ]
        }

        localStorage.setItem('roles-state', JSON.stringify(this.state)); // needed only in second case
    }

    toRender() {

        this.state = JSON.parse(localStorage.getItem('roles-state'))

        let _roles = _.get(this.state, 'roles', ["Empty list of roles"])

        this.roles = _roles.map((role) => <li key = { role } > {role} </li>);

        return this.roles
    }

    render() {
        return (
            <ul>{this.toRender()}</ul>
            )
    }
}


export { Roles, addRole };
