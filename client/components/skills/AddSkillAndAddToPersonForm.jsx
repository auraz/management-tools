/*
    Roles form

    Q1. this.state.value not works. this.props.value works. Why?
*/
import React from 'react';
import { connect } from 'react-redux'
import { addX } from '../common/action.jsx'

class AddSkillAndAddToPersonForm_ extends React.PureComponent {

    render() {
        return (
          <form onSubmit={e => this.props.handleSubmit(e, parseInt(this.props.person_id))} className="col-sm-auto col-4">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Skill" aria-label="Skill" value={this.props.value} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Add a new skill</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (event, person_id) => {
            event.preventDefault();
            dispatch(addX(
              {person_id: person_id, name: event.target[0].value},
              "ADD_SKILL_TO_PERSON")
              )
        }
    }
}

const AddSkillAndAddToPersonForm = connect(null, mapDispatchToProps)(AddSkillAndAddToPersonForm_)

export default AddSkillAndAddToPersonForm
