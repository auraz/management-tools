import React from "react";

import SkillsTable from './SkillsTable.jsx'
import SkillForm from './SkillForm.jsx'


class Skills extends React.Component {

  render() {
    return (
      <div>
        <h2>Skills</h2>
        <SkillsTable/>
        <br/>
        <SkillForm />
      </div>
    )
  }

}

export default Skills
