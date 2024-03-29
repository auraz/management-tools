import React from 'react';
import { connect } from 'react-redux'


class ParamForm_ extends React.PureComponent {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="col-sm-auto col-4">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Parameter" aria-label="Parameter" value={this.props.value} />
          <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Add a new parameter (good or bad)</button>
          </div>
        </div>
      </form>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (event) => {
            event.preventDefault();
            dispatch({ payload:  { name: event.target[0].value }, type: "ADD_PARAM"})
        }
    }
}

export default connect(null, mapDispatchToProps)(ParamForm_)
