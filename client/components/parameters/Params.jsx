import React from "react";

import ParamsTable from './ParamsTable.jsx'
import ParamForm from './ParamForm.jsx'


class Params extends React.Component {

  render() {
    return (
      <div>
        <h2>Params</h2>
        <ParamsTable/>
        <br/>
        <ParamForm />
      </div>
    )
  }

}

export default Params
