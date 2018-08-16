import React from "react";

import ParamTable from './ParamTable.jsx'
import ParamForm from './ParamForm.jsx'


class Params extends React.Component {

  render() {
    return (
      <div>
        <h2>Params</h2>
        <ParamTable/>
        <br/>
        <ParamForm />
      </div>
    )
  }

}

export default Params
