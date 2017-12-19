/*
    Render list of roles and for to add new role.


    Why this not a function

    addRole(role) {
        this.state[roles].push(role);
        localStorage.setItem('roles-state', JSON.stringify(this.state));
    }
*/

import React from 'react';

export default class Roles extends React.Component {


    addRole(role) {
        this.state.roles.push(role);
        localStorage.setItem('roles-state', JSON.stringify(this.state));
    }

    constructor(props) {

        super(props)
        this.addRole = this.addRole.bind(this);

        this.state = {
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


        // localStorage.setItem('roles-state', JSON.stringify(this.state));

        let _roles = _.get(JSON.parse(localStorage.getItem('roles-state')), 'roles', ["Empty list of roles"])

        this.roles = _roles.map((role) => <li key = { role } > {role} </li>);
    }

    render() {
        return (
            <ul>{this.roles}</ul>
            )
    }
}
