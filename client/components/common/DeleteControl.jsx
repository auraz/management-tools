import React from "react";
import { connect } from "react-redux";


class DeleteControl extends React.Component {

  render() {
      return (
        <div tabIndex="-1">
          <small>
            <a href="#" onClick={(t) => this.props.handleDelete(t, { id: this.props.id, model: this.props.model })}>
            <i className="fas fa-times-circle"></i>
            </a>
          </small>
        </div>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleDelete: (target, payload) => dispatch({ payload: payload, type: "DELETE_ROW_FROM_MODEL" })
  };
};

export default connect(null, mapDispatchToProps)(DeleteControl);
