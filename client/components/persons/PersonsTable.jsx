import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import _ from 'lodash'

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
    this.props.fetchPersons();
  }


  render() {
    if (!this.props.persons) {
      return <div>Loading...</div>
    }
    return (
      <DragAndDropTable>
        {this.props.persons.map(person => {
          return (
            <Row key={person.id} id={person.id}>
              <th>
                <Link to={{ pathname: "/person/" + person.id }}>{person.name}</Link>
              </th>
              <td>
                <EditableRow action={_.partial(this.props.renamePerson, person.id)} formMode="textInput" />
              </td>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = state => {
  return { persons: state.PersonsReducer.persons };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPersons: () => dispatch({type: "FETCH_PERSONS"}),
    renamePerson: (id, newName) => dispatch({type: "RENAME_PERSON", payload: {id: id, name: newName}}),
    deletePerson: (id) => dispatch({type: "DELETE_PERSON", person_id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTable)
