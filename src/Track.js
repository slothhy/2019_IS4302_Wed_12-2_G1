import React, {Component} from 'react';
import './Form.css'

class Track extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracking: ""
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {

    } catch (err) {
      console.error(err)
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler.bind(this)} className="user-form">
          <p>Tracking Number:</p>
          <input type='text'
            id='tracking'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <button type='submit' className="btn-primary btn-submit">
            TRACK
          </button>
        </form>
      </React.Fragment>
    )
  }
}

export default Track;