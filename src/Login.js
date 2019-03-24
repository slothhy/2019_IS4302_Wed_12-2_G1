import React, {Component} from 'react';
import './Form.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
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
          <p>Email:</p>
          <input type='text'
            id='email'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Password:</p>
          <input type='text'
            id='password'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <button type='submit' className="btn-primary btn-submit">
            LOGIN
          </button>
        </form>
      </React.Fragment>
    )
  }
}

export default Login;