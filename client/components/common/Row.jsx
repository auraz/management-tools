import React from "react"
import HTML5Backend from 'react-dnd-html5-backend'
import {DragSource, DropTarget} from 'react-dnd'


var Types = {
  ROW: 'row'
};


var rowSource = {
    beginDrag(props) {
        return { id: props.id };
    }
};


var rowTarget = {
    hover(props, monitor) {
        let draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.moveRow(draggedId, props.id);
        }
    }
};


var sourceCollect = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};


var targetCollect = function(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};


class Row extends React.Component{
    render() {
        let opacity = this.props.isDragging ? 0 : 1;
        const {connectDragSource, connectDropTarget, children} = this.props;
        return connectDragSource(connectDropTarget(
            <tr style={{opacity: opacity}}>{children}</tr>
        ));
    }
}

var source = DragSource(Types.ROW, rowSource, sourceCollect)(Row);
export default DropTarget(Types.ROW, rowTarget, targetCollect)(source);
