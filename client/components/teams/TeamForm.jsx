import React from 'react';
import { connect } from 'react-redux'


class TeamsForm_ extends React.PureComponent {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="col-sm-auto col-4">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Team name" aria-label="Team name" value={this.props.value} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Add team</button>
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
            dispatch({payload: event.target[0].value, type: "ADD_TEAM"})
        }
    }
}

const TeamsForm = connect(null, mapDispatchToProps)(TeamsForm_)

export default TeamsForm
