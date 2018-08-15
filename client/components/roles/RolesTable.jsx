import { connect } from 'react-redux'
import React from "react"
import _ from 'lodash'

import Row from "../common/Row.jsx"
import DragAndDropTable from "../common/DragAndDropTable.jsx"
import EditableRow from "../common/EditableRow.jsx";


class RolesTable extends React.Component {

  deleteControl(id) {
    return <div tabIndex="-1">
       <small>
        <a href="#" onClick={(t) => this.props.deleteRole(id)}><i className="fas fa-times-circle"></i></a>
        </small>
      </div>
  }

  componentWillMount() {
    this.props.fetchRoles();
  }

  render() {
    if (!this.props.roles) {
      return <div>Loading...</div>
    }
    return <DragAndDropTable>
      {
         this.props.roles.map(role => {
          return <Row key={role.id} id={role.id}>
            <th>{role.name}</th>
            <th>
            <EditableRow action={_.partial(this.props.renameRole, role.id)} formMode="textInput" />
            </th>
            <th>
              { this.deleteControl(role.id) }
            </th>
          </Row>
        })
      }
    </DragAndDropTable>
  }

}

const mapStateToProps = state => {
  return { roles: state.RolesReducer.roles };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoles: () => dispatch({type: "FETCH_ROLES"}),
    renameRole: (id, newName) => dispatch({type: "RENAME_ROLE", payload: {id: id, name: newName}}),
    deleteRole: (id) => dispatch({type: "DELETE_ROLE", role_id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesTable)
