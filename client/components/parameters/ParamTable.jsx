import { connect } from 'react-redux'
import React from "react"

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx";


class ParamTable extends React.Component {

  deleteControl(id) {
    return <div tabIndex="-1">
       <small>
        <a href="#" onClick={(t) => this.props.deleteParam(id)}><i className="fas fa-times-circle"></i></a>
        </small>
      </div>
  }

  componentWillMount() {
    this.props.fetchParams();
  }

  render() {
    if (!this.props.params) {
      return <div>Loading...</div>
    }
    return <DragAndDropTable>
      {
         this.props.params.map(param => {
          return <Row key={param.id} id={param.id}>
            <th>{param.name}</th>
            <td>
              <EditableRow value="" model="params" id={param.id} formMode="textInput" />
            </td>
          </Row>
        })
      }
    </DragAndDropTable>
  }

}

const mapStateToProps = state => {
  return { params: state.ParamsReducer.params };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParams: () => dispatch({type: "FETCH_PARAMS"}),
    renameParam: (id, newName) => dispatch({type: "RENAME_PARAM", payload: {id: id, name: newName}}),
    deleteParam: (id) => dispatch({type: "DELETE_PARAM", param_id: id}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ParamTable)
