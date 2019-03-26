import React, {Component} from 'react';
import './Form.css'

const backend_url = "http://localhost:8000";
const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      infoMessage: ""
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {
      let user = {
        email: this.state.email,
        password: this.state.password
      }

      let resp = await axios.post(`${backend_url}/users/login`, { 
        user 
      })

      this.props.login(this.state.email)
      this.props.redirect("input")

    } catch (err) {
      this.setState({ infoMessage: err.response.data.message })
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
          <span className="login-error">{this.state.infoMessage}</span>
          
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