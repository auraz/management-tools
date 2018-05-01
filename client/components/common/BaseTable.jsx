import React from "react"

import Row from "./Row.jsx"
import EditableRow from "./EditableRow.jsx"


class BaseTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
        this.moveRow = this.moveRow.bind(this);
    }

    moveRow(id, afterId) {
        let rows = this.state.rows.concat([])
        let currentRow = rows.filter((r) => r.id === id)[0];
        let afterRow = rows.filter((r) => r.id === afterId)[0];
        let currentRowIndex = rows.indexOf(currentRow);
        let afterRowIndex = rows.indexOf(afterRow);
        // remove the current row
        rows.splice(currentRowIndex, 1);
        // put it after
        rows.splice(afterRowIndex, 0, currentRow);
        this.setState({rows: rows});
    }

    render() {
        let rows = this.state.rows.map((r) => {
            return <Row key={r.id} id={r.id} moveRow={this.moveRow}>
                <th>{r.name}</th>
                <td><EditableRow value={r.value} /></td>
            </Row>
        });
        return (
            <table className="table table-striped">
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default BaseTable
