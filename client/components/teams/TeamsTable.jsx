import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";


import Row from "../common/Row.jsx";
import DragAndDropTable from "../common/DragAndDropTable.jsx";
import EditableRow from "../common/EditableRow.jsx";
import DeleteControl from "../common/DeleteControl.jsx";


class TeamsTable extends React.Component {

  componentWillMount() {
    this.props.initState1()
  }

  render() {
    if (!this.props.teams) {
      return <div>Loading...</div>
    }
    return (
      <DragAndDropTable>
        {this.props.teams.map( team => {
          return (
            <Row key={team.id} id={team.id}>
              <th>
                <Link to={{ pathname: "/team/" + team.id }}>{ team.name }</Link>
              </th>
              <th>
                <EditableRow  id={team.id} model="teams" value="" formMode="textInput" />
              </th>
              <th>
                <DeleteControl id={team.id} model="teams" /> {/* Should be cascade deletion */}
              </th>
              <th>
                  {/*<TeamProgress team={team.id}/>*/}
                  {/*<TeamRoles team={team.id}/>*/}
                </th>
            </Row>
          );
        })}
      </DragAndDropTable>
    );
  }
}

const mapStateToProps = (state) => {
  return { teams: state.teams }
}
const mapDispatchToProps = (dispatch) => {
    return {
        initState1: () => {
            dispatch({type: "INIT_STATE", payload: {}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable)
