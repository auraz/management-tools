import React from "react"


class DragAndDropTable extends React.Component{
    constructor(props) {
        super(props);
        this.moveRow = this.moveRow.bind(this);
    }

    moveRow(id, afterId) {
        let rows = this.state.rows.concat([])
        let currentRow = rows.filter((r) => r.props.id === id)[0];
        let afterRow = rows.filter((r) => r.props.id === afterId)[0];
        let currentRowIndex = rows.indexOf(currentRow);
        let afterRowIndex = rows.indexOf(afterRow);
        // remove the current row
        rows.splice(currentRowIndex, 1);
        // put it after
        rows.splice(afterRowIndex, 0, currentRow);
        this.setState({rows: rows});
    }

    render() {
        return (
            <table className="table table-striped">
                <tbody>{React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, {
                        moveRow: this.moveRow
                    })
                })}</tbody>
            </table>
        );
    }
}

export default DragAndDropTable
