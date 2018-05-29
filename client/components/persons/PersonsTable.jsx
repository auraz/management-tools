import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import EditableParamRow from "../common/EditableRow.jsx";


class PersonsTable extends React.Component {
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

export default connect(mapStateToProps)(PersonsTable);
