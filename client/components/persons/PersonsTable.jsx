import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import EditableRow from "../common/EditableRow.jsx";


class PersonsTable extends React.Component {

  deleteControl(id) {
    return <div tabIndex="-1">
       <small>
        <a href="#" onClick={(t) => this.props.deletePerson(id)}><i className="fas fa-times-circle"></i></a>
        </small>
      </div>
  }

  componentWillMount() {
    this.props.fetchPersons()  //?
  }


  render() {
    return (
      <DragAndDropTable>
        {this.props.persons.map(r => {
          return (
            <Row key={r.id} id={r.id}>
              <th>
                <Link to={{ pathname: "/person/" + r.id }}>{r.name}</Link>
              </th>
              <td>
                <EditableRow value="" model="persons" id={r.id} formMode="textInput" />
              </td>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = state => {
  return { persons: state.persons };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePerson: (id) => dispatch({type: "DELETE_PERSON", person_id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTable)
