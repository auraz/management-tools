import React from 'react';
import { connect } from 'react-redux'
import { addX } from '../common/action.jsx'


class AddParameterAndAddToPersonForm_ extends React.PureComponent {

  render() {
    return (
      <form onSubmit={e => this.props.handleSubmit(
        e,
        this.props.param_table,
        this.props.persons_param_table,
        parseInt(this.props.person_id)
      )} className="col-sm-auto col-4">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Param name" aria-label="Param name" value={this.props.value} />
          <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Add a new parameter</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (event, param_table, persons_param_table, person_id) => {
            event.preventDefault();
            dispatch(addX(
              {param_table: param_table, persons_param_table: persons_param_table, person_id: person_id, name: event.target[0].value},
              "ADD_PARAMETER_TO_PERSON")
            )
        }
    }
}

const AddParameterAndAddToPersonForm = connect(null, mapDispatchToProps)(AddParameterAndAddToPersonForm_)

export default AddParameterAndAddToPersonForm
