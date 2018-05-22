import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";


import Row from "../common/Row.jsx";
import EditableRow from "../common/EditableRow.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";

class PersonsTable extends React.Component {
  render() {
    return (
      <DragAndDropTable>
        {this.props.rows.map(r => {
          return (
            <Row key={r.id} id={r.id}>
              <th>
                <Link to={{ pathname: "/person/" + r.id }}>{r.name}</Link>
              </th>
              <td>
                <EditableRow value={r.value} />
              </td>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = state => {
  // for persons_skills
  // return { rows:Object.keys(state.persons).map((key, idx) =>  ({id: idx, name: key, value: ""}))}
  return {
    rows: state.persons.map(key => ({ id: key.id, name: key.name, value: "" }))
  };
};

export default connect(mapStateToProps)(PersonsTable);
