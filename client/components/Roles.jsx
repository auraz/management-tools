/*
    Render list of roles and for to add new role.
*/

import React from 'react';

export default class Roles extends React.Component {

    constructor(props) {
        super(props)

        this.all_grades = [
            "Junior",
            "Middle",
            "Senior",
            "Lead",
        ]

        this.all_roles = [
            "Developer",
            "DevOPS",
            "QA",
            "Architect",
            "Lead",
            "Product Owner",
            "Project Coordinator",
            "Team Coordinator",
        ]

         this.roles = this.all_roles.map((role) => <li key = { role } > {role} </li>);
    }

    render() {
        return (
            //form to add new role
            <ul>{this.roles}</ul>
            )
    }
}
