/*
    Render list of roles and for to add new role.


    Why this not a function

    addRole(role) {
        this.state[roles].push(role);
        localStorage.setItem('roles-state', JSON.stringify(this.state));
    }
*/

import React from 'react';


function addRole(role) {
        this.state.roles.push(role);
        localStorage.setItem('roles-state', JSON.stringify(this.state));
        console.log(role, this.state)
        this.setState(JSON.parse(localStorage.getItem('roles-state')))
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

        localStorage.setItem('roles-state', JSON.stringify(this.state));
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
