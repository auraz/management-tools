import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";

import EditableTeamRow from "./EditableTeamRow.jsx";


class TeamsTable extends React.Component {
  render() {
    return (
      <DragAndDropTable>
        {this.props.rows.map(r => {
          return (
            <Row key={r.id} id={r.id}>
              <th>
                <Link to={{ pathname: "/team/" + r.id }}>
                { r.name  }
                </Link>
              </th>
              <td>
                <EditableTeamRow value={""} {...this.props} team_id={r.id} formMode="textInput" />
              </td>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = state => {
  return {
    rows: state.teams.map(key => ({ id: key.id, name: key.name, value: "" }))
  };
};

export default connect(mapStateToProps)(TeamsTable);
