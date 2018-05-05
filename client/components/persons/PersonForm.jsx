import React from 'react';
import { connect } from 'react-redux'
import { addX } from '../common/action.jsx'


class PersonsForm_ extends React.PureComponent {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="col-sm-auto col-4">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Role name" aria-label="Role name" value={this.props.value} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Add a new role</button>
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
            dispatch(addX(event.target[0].value))
        }
    }
}

const PersonsForm = connect(null, mapDispatchToProps)(PersonsForm_)

export default PersonsForm